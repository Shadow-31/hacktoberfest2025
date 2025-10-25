import java.util.Scanner;

class BankAccount {
    private String accountHolder;
    private double balance;
    private String pin;

    public BankAccount(String accountHolder, double initialBalance, String pin) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.pin = pin;
    }

    public boolean authenticate(String enteredPin) {
        return pin.equals(enteredPin);
    }

    public void checkBalance() {
        System.out.println("💰 Current Balance: ₹" + balance);
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("✅ ₹" + amount + " deposited successfully.");
        } else {
            System.out.println("❌ Invalid deposit amount.");
        }
        checkBalance();
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("❌ Invalid withdrawal amount.");
        } else if (amount > balance) {
            System.out.println("❌ Insufficient balance.");
        } else {
            balance -= amount;
            System.out.println("✅ ₹" + amount + " withdrawn successfully.");
        }
        checkBalance();
    }
}

public class BankSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BankAccount account = new BankAccount("Anubhav Mishra", 5000.0, "1234");

        System.out.println("🏦 Welcome to Simple ATM System");
        System.out.print("🔐 Enter your PIN: ");
        String enteredPin = sc.nextLine();

        if (!account.authenticate(enteredPin)) {
            System.out.println("❌ Incorrect PIN. Access Denied.");
            sc.close();
            return;
        }

        int choice = 0;
        while (choice != 4) {
            System.out.println("\n===== ATM MENU =====");
            System.out.println("1️⃣ Check Balance");
            System.out.println("2️⃣ Deposit Money");
            System.out.println("3️⃣ Withdraw Money");
            System.out.println("4️⃣ Exit");
            System.out.print("👉 Enter your choice: ");

            // Handle invalid input
            if (!sc.hasNextInt()) {
                System.out.println("❌ Invalid input. Please enter a number between 1 and 4.");
                sc.next(); // discard invalid input
                continue;
            }

            choice = sc.nextInt();

            switch (choice) {
                case 1 -> account.checkBalance();
                case 2 -> {
                    System.out.print("💵 Enter amount to deposit: ₹");
                    if (sc.hasNextDouble()) {
                        double depositAmount = sc.nextDouble();
                        account.deposit(depositAmount);
                    } else {
                        System.out.println("❌ Invalid amount entered.");
                        sc.next(); // discard invalid input
                    }
                }
                case 3 -> {
                    System.out.print("💸 Enter amount to withdraw: ₹");
                    if (sc.hasNextDouble()) {
                        double withdrawAmount = sc.nextDouble();
                        account.withdraw(withdrawAmount);
                    } else {
                        System.out.println("❌ Invalid amount entered.");
                        sc.next(); // discard invalid input
                    }
                }
                case 4 -> System.out.println("👋 Thank you for using our ATM. Goodbye!");
                default -> System.out.println("❌ Invalid choice. Please try again.");
            }
        }

        sc.close();
    }
}
