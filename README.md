# React + TypeScript Calculator

A modern, responsive calculator with keyboard support, built using React and TypeScript.

![Calculator](preview.png)

## 🚀 Features

- ✨ Modern design
- 📱 Fully responsive interface
- ⌨️ Keyboard input support
- 🎯 Basic mathematical operations
- 🔄 Decimal number support
- ⚡ Fast and smooth animations
- 🎨 Pleasant visual effects
- 🌙 Dark/Light theme
- 📊 Redux state management
- ➖ Negative numbers support
- 📝 Calculation history with LocalStorage
- 🔄 History reuse functionality

## 🛠 Technologies

- React 18
- TypeScript
- Vite
- Redux Toolkit
- CSS3 (with modern features)
- LocalStorage API

## 📋 Functionality

### Basic Operations
- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)
- Decimal numbers (.)
- Negative numbers (-)
- Clear (C)
- Delete last character (Backspace)

### Advanced Features
- Theme switching (Dark/Light)
- Error handling for division by zero
- State management with Redux Toolkit
- Support for complex expressions with negative numbers
- Calculation history with LocalStorage persistence
- Ability to reuse previous calculations
- Last 10 calculations stored automatically

### Keyboard Support

| Key | Action |
|---------|----------|
| 0-9 | Input numbers |
| . | Decimal point |
| + | Addition |
| - | Subtraction/Negative number |
| * | Multiplication |
| / | Division |
| Enter/= | Calculate result |
| Escape/Delete | Clear all |
| Backspace | Delete last character |

## 🚀 Installation and Launch

1. Clone the repository:
```bash
git clone https://github.com/your-username/calculator.git
```

2. Navigate to the project directory:
```bash
cd calculator
```

3. Install dependencies:
```bash
npm install
```

4. Start the project:
```bash
npm run dev
```

5. Open your browser and go to [http://localhost:5173](http://localhost:5173)

## 📱 Responsiveness

The calculator is adapted for various devices:
- 📱 Mobile phones (including small screens)
- 📱 Tablets
- 💻 Desktops
- 🔄 Support for portrait and landscape orientations

## 🎨 Design Features

- Modern minimalist interface
- Responsive button animations
- Shadows and gradients for volume effect
- Adaptive font sizes and spacing
- Touch device optimization
- Special hover effects for desktop
- Theme switching with smooth transitions
- Error modal with backdrop blur
- Clean and organized history display
- Interactive history items with hover effects

## 🔧 Technical Implementation

- Using React Hooks (useState, useEffect)
- TypeScript typing
- Modern CSS features (clamp, min, grid)
- Performance optimization
- Edge cases and error handling
- Redux Toolkit for state management
- Context API for theme management
- LocalStorage for data persistence
- Responsive scroll handling
- Error boundary implementation

## 💾 Data Persistence

The calculator implements data persistence through:
- LocalStorage for calculation history
- Theme preference storage
- Automatic saving of last 10 calculations
- History clearing functionality
- Data recovery on page reload

## 🤝 Contributing

If you want to contribute to the project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Create a Pull Request

## 📝 License

MIT License - feel free to use it for your purposes!

## 👤 Author

Your Name
- GitHub: [@LilChich001](https://github.com/LilChich001)

## 🌟 Future Plans

- [ ] Add scientific functions
- [x] Save calculation history
- [x] Dark theme
- [x] Support for negative numbers
- [ ] Unit converter
- [ ] Memory operations
- [ ] Keyboard shortcuts help modal
- [ ] Export history to file
- [ ] Import history from file
- [ ] Multiple history lists
