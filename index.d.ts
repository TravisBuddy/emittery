// Type definitions for emittery
// Project: emittery
// Definitions by: Sindre Sorhus <sindresorhus.com>

export = Emittery;

/**
 * Simple and modern async event emitter
 *
 * @template T - Type of the event name.
 */
declare class Emittery<T extends string> {

		/**
		 * Subscribe to an event.
		 *
		 * Using the same listener multiple times for the same event will result
		 * in only one method call per emitted event.
		 *
		 * @template U
		 * @param eventName
		 * @param listener
		 * @returns Unsubscribe method.
		 */
		on<U>(eventName: T, listener: (eventData: U) => any): () => void;

		/**
		 * Subscribe to an event only once. It will be unsubscribed after the first
		 * event.
		 *
		 * @template U
		 * @param eventName
		 * @returns Promise for the event data when eventName is emitted
		 */
		once<U>(eventName: T): Promise<U>;

		/**
		 * Unsubscribe to an event.
		 *
		 * If you don't pass in a listener, it will remove all listeners for that
		 * event.
		 *
		 * @param eventName
		 */
		off(eventName: T, listener?: (x: any) => any): void;

		/**
		 * Subscribe to be notified about any event.
		 *
		 * @template U
		 * @param listener
		 * @returns A method to unsubscribe
		 */
		onAny(listener: (eventName: T, eventData: any) => any): () => void;

		/**
		 * Unsubscribe an onAny listener.
		 *
		 * If you don't pass in a listener, it will remove all onAny listeners.
		 *
		 */
		offAny(listener: (eventName: T, eventData: any) => any): void;

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
		 * @template U
		 * @param eventName
		 * @param [eventData]
		 * @returns a promise for when all the event listeners are done.
		 */
		emit<U>(eventName: T, eventData?: U): Promise<void>;

		/**
		 * Same as `emit`, but it waits for each listener to resolve before
		 * triggering the next one. This can be useful if your events depend on each
		 * other. Although ideally they should not. Prefer emit() whenever possible.
		 *
		 * If any of the listeners throw/reject, the returned promise will be
		 * rejected with the error and the remaining listeners will not be called.
		 *
		 * @template U
		 * @param eventName
		 * @param [eventData]
		 * @returns a promise for the last event listener settle or first one rejecting.
		 */
		emitSerial<U>(eventName: T, eventData?: U): Promise<void>;

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
		listenerCount(eventName?: T): number;
}
