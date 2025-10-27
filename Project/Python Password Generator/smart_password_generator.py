import tkinter as tk
from tkinter import messagebox
import random
import string

# ---------- Password Generation ----------
def generate_password(length=12):
    upper = string.ascii_uppercase
    lower = string.ascii_lowercase
    digits = string.digits
    symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if length < 8:
        length = 8

    password = [
        random.choice(upper),
        random.choice(lower),
        random.choice(digits),
        random.choice(symbols),
    ]
    all_chars = upper + lower + digits + symbols
    password += random.choices(all_chars, k=length - 4)
    random.shuffle(password)
    return ''.join(password)

# ---------- Password Strength ----------
def password_strength(password):
    score = 0
    if any(c.islower() for c in password): score += 1
    if any(c.isupper() for c in password): score += 1
    if any(c.isdigit() for c in password): score += 1
    if any(c in string.punctuation for c in password): score += 1
    if len(password) >= 12: score += 1
    return score

def strength_text(score):
    return ["Very Weak 😢", "Weak 😕", "Medium 🙂", "Strong 💪", "Very Strong 🔥"][score-1] if score else "Too Short"

def strength_color(score):
    colors = ["gray", "red", "orange", "yellow", "green"]
    return colors[score-1] if score else "#555"

# ---------- GUI Actions ----------
alert_shown = False  # Track if alert has been shown

def on_generate():
    length = int(length_slider.get())
    pwd = generate_password(length)
    password_entry.delete(0, tk.END)
    password_entry.insert(0, pwd)
    update_strength(pwd)

def on_input(event):
    global alert_shown
    pwd = password_entry.get()

    # Alert if password exceeds 32 characters
    if len(pwd) > 32:
        if not alert_shown:
            messagebox.showwarning("⚠️ Too Long", "Password too long! Please keep it under 32 characters.")
            alert_shown = True
        # Trim extra characters
        password_entry.delete(32, tk.END)
    else:
        alert_shown = False

    update_strength(pwd)

def update_strength(pwd):
    score = password_strength(pwd)
    color = strength_color(score)
    label_strength_text.config(text=strength_text(score), fg=color)
    bar_canvas.delete("all")
    bar_canvas.create_rectangle(0, 0, score * 60, 20, fill=color, outline="")
    strength_label.config(fg=color)

def copy_to_clipboard():
    pwd = password_entry.get()
    if not pwd:
        messagebox.showinfo("No Password", "Generate or enter a password first!")
    else:
        root.clipboard_clear()
        root.clipboard_append(pwd)
        messagebox.showinfo("Copied ✅", "Password copied to clipboard!")

# ---------- Responsive Background ----------
def draw_background(event=None):
    canvas_bg.delete("all")
    w, h = root.winfo_width(), root.winfo_height()
    canvas_bg.create_rectangle(0, 0, w, h, fill="#0a0a0f", outline="")
    canvas_bg.create_oval(-w//3, -h//3, w//2, h//1.5, fill="#111133", outline="")
    canvas_bg.create_oval(w//3, h//3, w*1.2, h*1.2, fill="#001f33", outline="")

# ---------- GUI ----------
root = tk.Tk()
root.title("💎 Smart Password Generator")
root.geometry("720x500")
root.configure(bg="#0a0a0f")
root.resizable(True, True)

# --- Dynamic Background ---
canvas_bg = tk.Canvas(root, highlightthickness=0)
canvas_bg.pack(fill="both", expand=True)
root.bind("<Configure>", draw_background)

# --- Glass Frame ---
glass = tk.Frame(root, bg="#1a1a2f", bd=0)
glass.place(relx=0.5, rely=0.5, anchor="center", width=520, height=430)
glass.config(highlightbackground="#00e5ff", highlightthickness=1)

# --- Title ---
tk.Label(glass, text="🔐 Smart Password Generator", font=("Poppins", 18, "bold"),
         fg="#00e5ff", bg="#1a1a2f").pack(pady=20)

# --- Length Section ---
tk.Label(glass, text="Password Length", font=("Poppins", 12), fg="white", bg="#1a1a2f").pack(pady=(5, 0))
length_slider = tk.Scale(glass, from_=8, to=32, orient="horizontal", length=350,
                         bg="#252540", fg="white", troughcolor="#00e5ff", highlightthickness=0)
length_slider.set(12)
length_slider.pack(pady=10)

# --- Buttons ---
btn_frame = tk.Frame(glass, bg="#1a1a2f")
btn_frame.pack(pady=15)

generate_btn = tk.Button(btn_frame, text="⚡ Auto Generate", command=on_generate,
                         font=("Poppins", 11, "bold"), bg="#00e5ff", fg="black", relief="flat",
                         padx=16, pady=7, activebackground="#0099cc", activeforeground="white")
generate_btn.pack(side="left", padx=10)

copy_btn = tk.Button(btn_frame, text="📋 Copy", command=copy_to_clipboard,
                     font=("Poppins", 11, "bold"), bg="#9c27b0", fg="white", relief="flat",
                     padx=16, pady=7, activebackground="#7b1fa2")
copy_btn.pack(side="left", padx=10)

# --- Password Entry ---
tk.Label(glass, text="Or Enter Your Own Password:", font=("Poppins", 11), fg="white", bg="#1a1a2f").pack(pady=10)
password_entry = tk.Entry(glass, font=("Consolas", 15), justify="center", width=34,
                          bd=0, relief="flat", bg="#101020", fg="#00e5ff", insertbackground="white")
password_entry.pack(pady=8)
password_entry.bind("<KeyRelease>", on_input)

# --- Strength Section ---
strength_label = tk.Label(glass, text="Password Strength", font=("Poppins", 11, "bold"),
                          fg="white", bg="#1a1a2f")
strength_label.pack(pady=(15, 5))

# Strength in words ABOVE the bar
label_strength_text = tk.Label(glass, text="Too Short", font=("Poppins", 12, "bold"),
                               bg="#1a1a2f", fg="#888")
label_strength_text.pack(pady=(0, 5))

bar_canvas = tk.Canvas(glass, width=320, height=20, bg="#101020", bd=0, highlightthickness=0)
bar_canvas.pack()

# --- Footer ---
tk.Label(glass, text="Made with ❤️ using Python", font=("Poppins", 9),
         fg="#888", bg="#1a1a2f").pack(side="bottom", pady=10)

root.mainloop()
