## Input

### Advice from r/u/LetterBoxSnatch

I think I understand what you are looking for, as I use a similar workflow. It sounds to me like you want to be able to actually hold onto state, rather than merely execute the last statement by itself, and you want to have the return value of your final statement print to the screen. I like to use nodemon with ts-node to watch for file changes and execute some program or subset of a program whenever the designated file(s) are saved. It sounds like my CMD-S is similar to your Hotkey setup.

I don't have the magic button for you, but I do have a few hints:

you can add a dependency to ts-node prior to it executing your designated file using the --require,-r flag. You could use this to setup your wrapper, or to open a socket / pipe.

you can get the node REPL tooling in your own scripts using require('node:repl'). The REPL can be from stdin/stdout, or it can be from any node stream. This would let you poke around with the current state pretty seamlessly, and even make changes to state without Typescript complaining at you (as long as you use the node REPL, not the ts-node REPL).

The VSCode debugger already does this for you. I'm sure there's a shortcut you could use to mark/unmark your line for pausing execution, followed by a shortcut for starting up the debugger. The debugger will give you lots of useful information about your current state. Make sure it doesn't already do what you want before you reinvent the wheel. Maybe you just want a specific debugger action to be available on hotkey, in which case it's a pretty straightforward VSCode configuration.

Good luck, and let me know if you find a solution that you like.

### Advice from mosskin-woast

Have you tried the Node standard library repl package?

## Strategies

### First

Make a command `yarn tinker <PATH>`.
By VS Code hotkey, dispatch the command with the path of current file.
