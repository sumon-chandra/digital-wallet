import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface FilterPanelProps {
	onFilterChange: (filters: FilterParams) => void;
}

export interface FilterParams {
	search: string;
	status: string;
	emailVerified: string;
}

const STATUS_OPTIONS = ["ACTIVE", "INACTIVE", "BLOCKED"];
const EMAIL_VERIFIED_OPTIONS = ["VERIFIED", "PENDING"];

export const UserFilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [filters, setFilters] = useState<FilterParams>({
		search: searchParams.get("search") || "",
		status: searchParams.get("status") || "",
		emailVerified: searchParams.get("emailVerified") || "",
	});

	// Update filters from URL params on component mount
	useEffect(() => {
		const newFilters: FilterParams = {
			search: searchParams.get("search") || "",
			status: searchParams.get("status") || "",
			emailVerified: searchParams.get("emailVerified") || "",
		};
		setFilters(newFilters);
		onFilterChange(newFilters);
	}, [searchParams, onFilterChange]);

	// Handle search input change
	const handleSearchChange = (value: string) => {
		const newFilters = { ...filters, search: value };
		setFilters(newFilters);
		updateUrlParams(newFilters);
	};

	// Handle status filter change
	const handleStatusChange = (value: string) => {
		const newFilters = {
			...filters,
			status: filters.status === value ? "" : value,
		};
		setFilters(newFilters);
		updateUrlParams(newFilters);
	};

	// Handle email verified filter change
	const handleEmailVerifiedChange = (value: string) => {
		const newFilters = {
			...filters,
			emailVerified: filters.emailVerified === value ? "" : value,
		};
		setFilters(newFilters);
		updateUrlParams(newFilters);
	};

	// Update URL params and notify parent component
	const updateUrlParams = (newFilters: FilterParams) => {
		const params = new URLSearchParams();

		if (newFilters.search) params.set("search", newFilters.search);
		if (newFilters.status) params.set("status", newFilters.status);
		if (newFilters.emailVerified) params.set("emailVerified", newFilters.emailVerified);

		setSearchParams(params);
		onFilterChange(newFilters);
	};

	// Clear all filters
	const handleClearFilters = () => {
		const clearedFilters: FilterParams = {
			search: "",
			status: "",
			emailVerified: "",
		};
		setFilters(clearedFilters);
		setSearchParams({});
		onFilterChange(clearedFilters);
	};

	const hasActiveFilters = filters.search || filters.status || filters.emailVerified;

	return (
		<div className="mb-6 p-4 bg-primary-foreground rounded-lg border border-accent">
			{/* Search Input */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-2">Search (Name, Email, or Address)</label>
				<div className="relative">
					<Search className="absolute left-3 top-3 h-4 w-4 text-accent" />
					<Input
						type="text"
						placeholder="Search users..."
						value={filters.search}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="w-full pl-10 pr-4 py-2"
					/>
				</div>
			</div>

			{/* Filters Row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				{/* Status Filter */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
					<div className="flex flex-wrap gap-2">
						{STATUS_OPTIONS.map((status) => (
							<Button
								key={status}
								onClick={() => handleStatusChange(status)}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
									filters.status === status ? "bg-primary text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-primary"
								}`}
							>
								{status}
							</Button>
						))}
					</div>
				</div>

				{/* Email Verified Filter */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Email Verified</label>
					<div className="flex flex-wrap gap-2">
						{EMAIL_VERIFIED_OPTIONS.map((option) => (
							<button
								key={option}
								onClick={() => handleEmailVerifiedChange(option)}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
									filters.emailVerified === option ? "bg-primary text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-primary"
								}`}
							>
								{option}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Clear Filters Button */}
			{hasActiveFilters && (
				<button
					onClick={handleClearFilters}
					className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
				>
					<X className="h-4 w-4" />
					Clear All Filters
				</button>
			)}
		</div>
	);
};
