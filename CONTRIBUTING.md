# Contributing Guidelines

First off, thank you for considering contributing to Hacktoberfest 2025! Every contribution helps make this project better. We welcome everyone, and we're excited to see your ideas. 🎉

---

## 🚀 Getting Started

Follow these steps to contribute:

1. **Fork the Repository**  
   Click the "Fork" button on the top-right corner of the repository page on GitHub.

2. **Clone Your Fork**  
   Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/<your-username>/hacktoberfest--2025.git
   cd hacktoberfest--2025
   ```

3. **Set Up Remote**  
   Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/<owner>/hacktoberfest--2025.git
   ```

4. **Create a New Branch**  
   Create a descriptive branch name for your work:
   ```bash
   git checkout -b feature/your-awesome-idea
   ```
   Or for fixes:
   ```bash
   git checkout -b fix/descriptive-fix-name
   ```

5. **Make Your Changes**  
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Test your changes locally

6. **Commit Your Changes**  
   Commit with a clear and descriptive message:
   ```bash
   git commit -m "feat: Add number guessing game in Python"
   ```
   Or:
   ```bash
   git commit -m "docs: Fix typo in README section"
   ```

7. **Push to Your Fork**  
   Push your branch to your GitHub fork:
   ```bash
   git push origin feature/your-awesome-idea
   ```

8. **Create a Pull Request**  
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Submit the PR

---

## 📝 Pull Request Guidelines

### PR Title
Use a clear, descriptive title following the format:
- `feat: Add new feature` (for new features)
- `fix: Fix bug description` (for bug fixes)
- `docs: Update documentation` (for documentation changes)
- `refactor: Refactor code section` (for code refactoring)
- `style: Format code` (for formatting changes)

### PR Description
Your PR description should include:

1. **What changes you made** - Be specific about what you added, fixed, or improved
2. **Why you made these changes** - Explain the motivation or problem you're solving
3. **How to test** - Provide steps to verify your changes work
4. **Screenshots** - For UI changes, include before/after screenshots
5. **Issue reference** - Link to the issue: `Closes #issue-number`

### Example PR Description:
```markdown
## Description
This PR adds a new Python-based number guessing game with difficulty levels.

## Changes Made
- Added `NumberGuessingGame.py` in the `Project/` directory
- Implemented three difficulty levels (Easy, Medium, Hard)
- Added score tracking
- Included comprehensive comments

## Testing
Run the script: `python3 Project/NumberGuessingGame.py`
Test each difficulty level to ensure proper functionality.

## Screenshots
[Add screenshots if applicable]

Closes #42
```

---

## ✅ Code Standards

### General Guidelines

- **Write clean, readable code** - Follow the existing code style in the project
- **Add comments** - Explain complex logic or tricky parts of your code
- **Use meaningful names** - Variables, functions, and classes should be self-explanatory
- **Keep it simple** - Favor simplicity over cleverness
- **Test your code** - Make sure it runs without errors

### Language-Specific Guidelines

#### Java
- Follow Java naming conventions
- Add proper documentation comments
- Include a `README.md` if the project is complex

#### Python
- Follow PEP 8 style guide
- Use meaningful variable names
- Add docstrings to functions
- Include a `requirements.txt` if using external libraries

#### JavaScript/React
- Use modern ES6+ syntax
- Follow existing project conventions
- Add prop types validation
- Keep components small and focused

#### HTML/CSS
- Use semantic HTML
- Write responsive CSS
- Follow accessibility best practices
- Include a simple README

---

## 🎯 What You Can Contribute

We accept contributions in the following areas:

### New Projects
- Games (simple to medium complexity)
- Utilities and tools
- Mini applications
- Algorithms and data structures

### Improvements
- Fix bugs in existing code
- Improve UI/UX
- Add features to existing projects
- Optimize performance

### Documentation
- Fix typos and grammar
- Add missing documentation
- Improve existing documentation
- Add code comments

### Code Quality
- Refactor messy code
- Improve code organization
- Add error handling
- Improve user experience

---

## ❌ What NOT to Submit

Please avoid submitting:

- Generated files (build files, compiled code)
- Large binary files
- Copied code without attribution
- Code that doesn't follow the project structure
- Harmful or malicious code
- Pull requests that are empty or contain no changes

---

## 🔍 Review Process

1. **Automatic Checks** - GitHub Actions may run automated tests
2. **Review** - Maintainers will review your PR for quality and relevance
3. **Feedback** - You may receive feedback requesting changes
4. **Merge** - Once approved, your PR will be merged!

**We appreciate your patience during the review process.**

---

## 💡 Getting Help

If you need help or have questions:

- Open an issue for questions or suggestions
- Check existing issues for similar questions
- Ask in your PR for clarifications
- Be respectful and patient with maintainers

---

## 🎉 Thank You!

Every contribution, big or small, helps improve this project and makes Hacktoberfest a success. We're grateful for your time and effort!

Happy Coding! 🚀