import {
	createMachine,
} from "xstate";

type TToggleModeMachine = "system" | "dark" | "light"

export const ToggleModeMachine = createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswFtUTADpYBPWZXAYkwEsoALZAbQAYBdRUAB1VhuRqoAdpxAAPRAEYArABZCLaQHYAzJJYqAbACYW25QBoQJRLu2Ft6gJyyWSlrZV2Avs6NoM2PAUK0GySggAQwAnAGtWDiQQHj4BYVEJBBUVaUJJJSVJTU0rKwAOZUltWSMTBDMLa1t7Rxc3EA8sXHwiYPDKUnJcSNFY-kERaKSUtIysnLzCrJKyxHzJQlklK2zNSRVtbSsVAtcGoVb4aKavVr7eAYThxABaTTmEe9d3dGbvIi6KHAu4wcTELJtI98kpCHJMrJpNJNNIttolNIXo03mcfH5GL8rkNQEkSlZ0iwbNpppZERpHpVcisSppNiSlJp8sjTi0fO0wlj4jjxIDpItLPlppJZLJUiw7I8rCwFMslLJcrIMuohftnEA */
	predictableActionArguments: true,
	schema: {
		events: {} as { type: TToggleModeMachine, value: TToggleModeMachine },
	},
	id: "togglemode",
	initial: "system",
	states: {
		system: {
			on: {
				light: "light",
			},
		},
		light: {
			on: {
				dark: "dark",
			}
		},
		dark: {
			on: {
				system: "system",
			}
		}
	}
})