This project provides a collection of utility functions and classes for performing vector operations, generating UUIDs, and managing disposable handles, event signals, and asynchronous semaphores.

## Con Utility Features

- Vector operations: Perform common vector operations such as addition, subtraction, dot product, cross product, and [more](./Docs/con-utils/VectorMethods.md).
- UUID generation: [Generate version 4 UUIDs](./About/UUID.md) using random numbers.
- Disposable handles: Manage resources that need to be cleaned up when they are no longer needed using the [DisposableHandle](./Docs/con-utils/DisposableHandle.md) class.
- Asynchronous semaphores: Control access to a shared resource in an asynchronous environment using the [AsyncSemaphore](./Docs/con-utils/AsyncSemaphore.md) class.
- Event signals: Implement the observer pattern using the [EventSignal](./About/EventSignal.md) class to subscribe to events and be notified when they occur.
- Text menipulation via, [TextWriter/TextReader/TextStream](./Docs/con-utils/TextStream.md)