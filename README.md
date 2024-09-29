# Set Card Game

## 🎴 Project Overview
The Set Card Game is a classic matching game where players identify sets of three cards based on specific rules. This implementation features a dynamic user interface, smooth animations, and a competitive timer-based scoring system. 

Whether you’re a seasoned pro or new to the game, this project offers an engaging experience with sleek transitions and color-coded visual effects for the active player’s turn. 

### **Features:**
- Real-time player turn switching with visual highlights.
- Smooth card animations and hints for finding valid sets.
- Timer-based scoring system to track rounds and game flow.
- User input for personalized player names and scores.

## 🚀 Installation and Setup
Follow these steps to get the project up and running on your local machine:

1. **Clone the Repository**
   git clone https://github.com/cse-3901-sharkey/2024-au-Team-4-Lab-1.git
   cd 2024-au-Team-4-Lab-1
2. **Install Dependencies**
 Ensure you have a modern browser installed. No additional packages are required.

3. **Start the Project**

Open the index.html file in your preferred browser.
If you encounter file path issues or load failures, make sure all file paths are correctly relative to your root directory.


**Troubleshooting Installation:**

Problem: Images or cards are not displaying.
Solution: Check the paths of images in the scripts folder. Ensure that the img folder is correctly placed in the project root.

Problem: Timer or game logic not functioning.
Solution: Verify that all JavaScript files are linked properly in index.html. Console errors can provide hints on missing references.
    
## 🎮 How to Play

**Start the Game:**

Enter the names for Player 1 and Player 2 in the provided fields.
Click the "Start Game" button.

**Gameplay:**

Each player has 30 seconds per round to find as many sets as possible.
There will be 3 rounds with 2 tries eachg
A valid set consists of three cards where each feature (color, shape, number, and shading) is either the same or completely different on all three cards.
Click on three cards to form a set. If correct, they will be highlighted in green; otherwise, they will flash red.

## 🏆 Winning the Game:

The player with the most valid sets after three rounds wins.


PS: A hint button is available but can only be used once per game.
