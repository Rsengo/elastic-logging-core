1. Rename and refactor "models" modules
2. `configWorker.generateConfig` make work
3. `index.ts` refactor
4. publish with types
5. remove explicit babel (only tsc)
6. `LogMessageFactory` type cycles check
7. `PlainObject` type move to the root

Think about:
1. Error handling on post messages
2. Not sended queue (if error happens)
