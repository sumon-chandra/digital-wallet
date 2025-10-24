/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";

export interface ISidebarItem {
	title: string;
	items: {
		icon: any;
		title: string;
		url: string;
		component: ComponentType;
	}[];
}
