import { useEffect } from "react";

type NuiEvent<T = any> = {
	type: string;
} & T;

/**
 * useNuiEvent - Listens for a NUI message and triggers a callback
 * @param eventName - The event name to listen for
 * @param callback - The function to call when the event is received
 */
export const useNuiEvent = <T = any>(
	eventName: string,
	callback: (data: T) => void
) => {
	useEffect(() => {
		const handleMessage = (event: MessageEvent<NuiEvent<T>>) => {
			if (event.data?.type === eventName) {
				// Directly pass the full data object
				callback(event.data);
			}
		};

		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, [eventName, callback]);
};



//end nui event

// fetch nui
export async function fetchNui<T = unknown>(
	eventName: string,
	data?: unknown,
	mockData?: T
): Promise<T> {
	// Check if we're in a browser environment
	if (!(window as any).GetParentResourceName) {
		console.log(`[DEV] fetchNui called: ${eventName}`, data);
		// Return mock data for browser testing
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve((mockData || { success: true }) as T);
			}, 100);
		});
	}

	const options = {
		method: "post",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
		body: JSON.stringify(data),
	};

	const resourceName = (window as any).GetParentResourceName();

	try {
		const resp = await fetch(`https://${resourceName}/${eventName}`, options);
		
		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`);
		}

		const respFormatted = await resp.json();
		return respFormatted;
	} catch (error) {
		console.error(`fetchNui error for ${eventName}:`, error);
		throw error;
	}
}

//  end fetch nui