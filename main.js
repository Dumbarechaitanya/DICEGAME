document.addEventListener('DOMContentLoaded', () => {
    const press = document.getElementById('press');
    const P1 = document.getElementById('P1');
    const P2 = document.getElementById('P2');
    const result = document.getElementById('result');

    function rollDice() {
        result.textContent = ''; // Clear result while rolling

        let count = 0;
        const maxCount = 7; // total steps during animation
        const intervalTime = 10; // slower update every 200ms

        let rotation1 = 0;
        let rotation2 = 0;
        const animation = setInterval(() => {
            // During animation, randomly show dice images
            const random1 = Math.floor(Math.random() * 6) + 1;
            const random2 = Math.floor(Math.random() * 6) + 1;
            P1.src = `DICE/${random1}.png`;
            P2.src = `DICE/${random2}.png`;

             // Increase rotation angle by some amount to reach 360 degrees eventually
            rotation1 += 360 / maxCount;
            rotation2 += 360 / maxCount;

            P1.style.transform = `rotate(${rotation1}deg)`;
            P2.style.transform = `rotate(${rotation2}deg)`;

            count++;
            if (count >= maxCount) {
                clearInterval(animation);

                // After animation completes, wait a total of 5 seconds before showing result
                setTimeout(() => {
                    // Final dice roll
                    const PLY1 = Math.floor(Math.random() * 6) + 1;
                    const PLY2 = Math.floor(Math.random() * 6) + 1;
                    P1.src = `DICE/${PLY1}.png`;
                    P2.src = `DICE/${PLY2}.png`;

                   // Continue rotating smoothly to the next full circle before stopping
                    rotation1 = Math.ceil(rotation1 / 360) * 360 + 360;
                    rotation2 = Math.ceil(rotation2 / 360) * 360 + 360;

                    P1.style.transition = 'transform 1s ease-out';
                    P2.style.transition = 'transform 1s ease-out';

                    P1.style.transform = `rotate(${rotation1}deg)`;
                    P2.style.transform = `rotate(${rotation2}deg)`;

                    // Show the result
                    if (PLY1 > PLY2) {
                        result.textContent = 'Player 1 Wins!';
                    } else if (PLY2 > PLY1) {
                        result.textContent = 'Player 2 Wins!';
                    } else {
                        result.textContent = 'Draw!';
                    }
                }, 500); // 500 ms delay before showing final result
            }
        }, intervalTime);
    }

    if (press) {
        press.addEventListener('click', rollDice);
    }
});
