"use client"

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
	children,
	className,
	containerClassName,
	animate = true,
	variant = "green",
}: {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	animate?: boolean;
	variant?: "green" | "blue";
}) => {
	const variants = {
		initial: {
			backgroundPosition: "0 50%",
		},
		animate: {
			backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
		},
	};

	const gradientConfig = {
		green: {
			colors: {
				primary: "#00ff88",
				secondary: "#ff00ff",
				tertiary: "#00eeff"
			},
			duration: 4,
		},
		blue: {
			colors: {
				primary: "#0099ff",
				secondary: "#cc00ff",
				tertiary: "#00ffbb"
			},
			duration: 3.5,
		},
	};

	const config = gradientConfig[variant];
	const colors = config.colors;

	return (
		<div className={cn("relative p-[1px] group w-fit h-fit", containerClassName)}>
			{/* Fondo base muy sutil */}
			<div className={cn(
				"absolute inset-0 rounded-xl opacity-10",
				"transition-opacity duration-500 group-hover:opacity-20",
				variant === "green" ? "bg-gradient-to-br from-green-500 to-cyan-500" : "bg-gradient-to-br from-blue-500 to-purple-500"
			)} />

			{/* Gradiente animado principal - Muy discreto en normal */}
			<motion.div
				variants={animate ? variants : undefined}
				initial={animate ? "initial" : undefined}
				animate={animate ? "animate" : undefined}
				transition={
					animate
						? {
							duration: config.duration,
							repeat: Infinity,
							repeatType: "reverse",
						}
						: undefined
				}
				style={{
					backgroundSize: animate ? "400% 400%" : undefined,
				}}
				className={cn(
					"absolute inset-0 rounded-xl z-[1]",
					"opacity-15 blur-sm", // Muy sutil en estado normal
					"group-hover:opacity-60 group-hover:blur-lg", // Explosión de color en hover
					"transition-all duration-700 ease-out will-change-transform",
					`bg-[radial-gradient(circle_farthest-side_at_0_100%,${colors.primary},transparent),radial-gradient(circle_farthest-side_at_100%_0,${colors.secondary},transparent),radial-gradient(circle_farthest-side_at_100%_100%,${colors.tertiary},transparent),radial-gradient(circle_farthest-side_at_0_0,${colors.primary},#000000)]`
				)}
			/>

			{/* Contenido con transición suave */}
			<div className={cn(
				"relative z-10 bg-black/95 backdrop-blur-sm rounded-lg",
				"group-hover:bg-black/85",
				"group-hover:shadow-lg",
				variant === "green"
					? "group-hover:shadow-green-500/20"
					: "group-hover:shadow-blue-500/20",
				"transition-all duration-500 ease-in-out",
				className
			)}>
				{children}
			</div>

			{/* Efecto de borde que aparece en hover */}
			<div className={cn(
				"absolute inset-0 rounded-xl z-[2] border opacity-0",
				"group-hover:opacity-100",
				"transition-opacity duration-200 ease-out",
				variant === "green"
					? "border-green-400/30 shadow-[0_0_15px_rgba(0,255,136,0.4)]"
					: "border-blue-400/30 shadow-[0_0_15px_rgba(0,153,255,0.4)]"
			)} />
		</div>
	);
};