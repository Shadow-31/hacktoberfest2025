# morse_code_translator.py

# Dictionary representing the morse code chart
MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '0': '-----', ',': '--..--',
    '.': '.-.-.-', '?': '..--..', '/': '-..-.', '-': '-....-',
    '(': '-.--.', ')': '-.--.-', ' ': '/'
}

def encrypt(text):
    """Convert text to Morse code"""
    text = text.upper()
    morse_code = ' '.join(MORSE_CODE_DICT.get(char, '') for char in text)
    return morse_code

def decrypt(morse):
    """Convert Morse code to text"""
    morse += ' '
    decipher, citext = '', ''
    for char in morse:
        if char != ' ':
            citext += char
            space_found = 0
        else:
            if citext != '':
                decipher += list(MORSE_CODE_DICT.keys())[list(MORSE_CODE_DICT.values()).index(citext)]
                citext = ''
            else:
                decipher += ' '
    return decipher.strip()

if __name__ == "__main__":
    print("\n--- Morse Code Translator ---")
    print("1. Encrypt text to Morse Code")
    print("2. Decrypt Morse Code to text")
    choice = input("Enter your choice (1/2): ")

    if choice == '1':
        text = input("Enter text: ")
        print(f"Morse Code: {encrypt(text)}")
    elif choice == '2':
        morse = input("Enter Morse Code (separate letters with spaces): ")
        print(f"Decrypted Text: {decrypt(morse)}")
    else:
        print("Invalid choice. Please select 1 or 2.")
