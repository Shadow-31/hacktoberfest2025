import random
import datetime

def get_random_quote():
    quotes = [
        "Believe you can and you're halfway there. — Theodore Roosevelt",
        "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
        "The secret of getting ahead is getting started. — Mark Twain",
        "Dream big and dare to fail. — Norman Vaughan",
        "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
        "Hustle in silence and let your success make the noise.",
        "Push yourself because no one else is going to do it for you.",
        "Success doesn’t come to you, you go to it."
    ]
    return random.choice(quotes)

def main():
    today = datetime.date.today().strftime("%A, %B %d, %Y")
    print("🌞 Daily Motivational Quote Generator 🌞")
    print(f"Today's date: {today}")
    print("-" * 50)
    print(f"💬 {get_random_quote()}")
    print("-" * 50)
    print("✨ Have a productive and positive day ahead! ✨")

if __name__ == "__main__":
    main()
