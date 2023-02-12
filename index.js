// A helper function to output text to the console in cyan
const outputCyanText = (text) => console.log(`\x1b[36m${text}\x1b[0m`);


// A function that displays the applications name 'Employee Manager' to 
// the console.
const displayBanner = () => {
  outputCyanText(`  ______                 _                        `);
  outputCyanText(` |  ____|               | |                       `);
  outputCyanText(` | |__   _ __ ___  _ __ | | ___  _   _  ___  ___  `);
  outputCyanText(` |  __| | '_ ' _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\ `);
  outputCyanText(` | |____| | | | | | |_) | | (_) | |_| |  __/  __/ `);
  outputCyanText(` |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| `);
  outputCyanText(` |  \\/  |         | |             __/ |           `);
  outputCyanText(` | \\  / | __ _ _ _|_| __ _  __ _ |___/_ __        `);
  outputCyanText(` | |\\/| |/ _' | '_ \\ / _' |/ _' |/ _ \\ '__|       `);
  outputCyanText(` | |  | | (_| | | | | (_| | (_| |  __/ |          `);
  outputCyanText(` |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          `);
  outputCyanText(`                            __/ |                 `);
  outputCyanText(`                           |___/                  \n\n\n`);
};

displayBanner();
