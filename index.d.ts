// Type definitions for emittery
// Project: emittery
// Definitions by: Sindre Sorhus <sindresorhus.com>

/**
 * Simple and modern async event emitter
 *
 * @template T - An union of literal event name.
 */
declare class Emittery<Mapped = {[eventName: string]: any}, EventOnly = Mapped> {

		/**
		 * Subscribe to an event.
		 *
		 * Using the same listener multiple times for the same event will result
		 * in only one method call per emitted event.
		 *
		 * @returns Unsubscribe method.
		 */
		on<Name extends keyof Mapped>(eventName: Name, listener: (eventData: Mapped[Name]) => any): () => void;
		on<Name extends keyof EventOnly>(eventName: Name, listener: () => any): () => void;

		/**
		 * Subscribe to an event only once. It will be unsubscribed after the first
		 * event.
		 *
		 * @returns Promise for the event data when eventName is emitted
		 */
		once<Name extends keyof Mapped>(eventName: Name): Promise<Mapped[Name]>;
		once<Name extends keyof EventOnly>(eventName: Name): Promise<void>;

		/**
		 * Unsubscribe to an event.
		 *
		 * If you don't pass in a listener, it will remove all listeners for that
		 * event.
		 *
		 * @param [listener]
		 */
		off<Name extends keyof Mapped>(eventName: Name, listener?: (eventData: Mapped[Name]) => any): void;
		off<Name extends keyof EventOnly>(eventName: Name, listener?: () => any): void;

		/**
		 * Subscribe to be notified about any event.
		 *
		 * @returns A method to unsubscribe
		 */
		onAny<Name extends keyof Mapped>(listener: (eventName: Name, eventData: Mapped[Name]) => any): () => void;
		onAny<Name extends keyof EventOnly>(listener: (eventName: Name) => any): () => void;

		/**
		 * Unsubscribe an onAny listener.
		 *
		 * If you don't pass in a listener, it will remove all onAny listeners.
		 *
		 * @param [listener]
		 */
		offAny<Name extends keyof Mapped>(listener?: (eventName: Name, eventData: Mapped[Name]) => any): void;
		offAny<Name extends keyof EventOnly>(listener?: (eventName: Name) => any): void;

		/**
		 * Trigger an event asynchronously, optionally with some data. Listeners
		 * are called in the order they were added, but execute concurrently.
		 *
		 * Returns a promise for when all the event listeners are done. Done meaning
		 * executed if synchronous or resolved when an async/promise-returning
		 * function. You usually wouldn't want to wait for this, but you could for
		 * example catch possible errors. If any of the listeners throw/reject, the
		 * returned promise will be rejected with the error, but the other listeners
		 * will not be affected.
		 *
		 * @returns A promise for when all the event listeners are done.
		 */
		emit<Name extends keyof Mapped>(eventName: Name, eventData: Mapped[Name]): Promise<void>;
		emit<Name extends keyof EventOnly>(eventName: Name): Promise<void>;

		/**
		 * Same as `emit`, but it waits for each listener to resolve before
		 * triggering the next one. This can be useful if your events depend on each
		 * other. Although ideally they should not. Prefer emit() whenever possible.
		 *
		 * If any of the listeners throw/reject, the returned promise will be
		 * rejected with the error and the remaining listeners will not be called.
		 *
		 * @returns A promise for the last event listener settle or first one rejecting.
		 */
		emitSerial<Name extends keyof Mapped>(eventName: Name, eventData: Mapped[Name]): Promise<void>;
		emitSerial<Name extends keyof EventOnly>(eventName: Name): Promise<void>;

		/**
		 * Clear all event listeners on the instance.
		 */
		clear(): void;

		/**
		 * Count event listeners for the eventName or all events if not specified.
		 *
		 * @param eventName
		 * @returns Listener count.
		 */
		listenerCount<Name extends (keyof Mapped | keyof EventOnly)>(eventName?: Name): number;
}

export default Emittery;
