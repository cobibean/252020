# Contributing to 20-20-20 Focus Timer

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected vs actual behavior
- Your operating system and version
- Any relevant screenshots or error messages

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- A clear description of the feature
- Why this feature would be useful
- Any mockups or examples if applicable

### Submitting Pull Requests

1. **Fork the repository** and clone it locally
2. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the code style guidelines below
4. **Test your changes** thoroughly
5. **Commit your changes** with clear, descriptive commit messages
6. **Push to your fork** and open a pull request

## Code Style Guidelines

### TypeScript/React

- Use TypeScript for all new code
- Follow the existing code structure and patterns
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic

### Rust

- Follow Rust naming conventions (snake_case for functions/variables)
- Add doc comments for public functions
- Keep functions focused and small
- Handle errors appropriately

### General

- Keep code simple and readable
- Avoid unnecessary complexity
- Write self-documenting code
- Add comments where code intent isn't obvious

## Development Workflow

1. **Set up the project** following the README instructions
2. **Run the development server**:
   ```bash
   npm run dev          # For web app
   npm run tauri:dev    # For desktop app
   ```
3. **Make your changes** in the `src/` directory
4. **Test your changes** in both web and desktop modes if applicable
5. **Build and test** the production build:
   ```bash
   npm run build
   npm run tauri:build  # For desktop app
   ```

## Project Structure

- `src/` - Main application source code
  - `components/` - React components
  - `hooks/` - Custom React hooks
  - `config/` - Configuration files
  - `utils/` - Helper functions
- `src-tauri/` - Tauri desktop app configuration
  - `src/` - Rust source code
  - `icons/` - App icons
  - `tauri.conf.json` - Tauri configuration

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with your question
- Check existing issues and discussions
- Review the README for setup instructions

Thank you for contributing! 🎉
