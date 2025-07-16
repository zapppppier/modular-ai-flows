import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
				'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
				'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
				'2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				workspace: {
					DEFAULT: 'hsl(var(--workspace))',
					secondary: 'hsl(var(--workspace-secondary))',
					accent: 'hsl(var(--workspace-accent))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.3' },
					'50%': { opacity: '0.8' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'flow': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-2px)' }
				},
				'geometric-rotate': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'25%': { transform: 'rotate(90deg) scale(1.05)' },
					'50%': { transform: 'rotate(180deg) scale(1)' },
					'75%': { transform: 'rotate(270deg) scale(1.05)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'crystalline-pulse': {
					'0%, 100%': { 
						transform: 'scale(1) rotate(0deg)',
						filter: 'hue-rotate(0deg)'
					},
					'50%': { 
						transform: 'scale(1.02) rotate(2deg)',
						filter: 'hue-rotate(10deg)'
					}
				},
				'neural-flow': {
					'0%': { 
						opacity: '0.3',
						transform: 'translateX(-100%) scale(0.8)'
					},
					'50%': {
						opacity: '1',
						transform: 'translateX(0%) scale(1)'
					},
					'100%': { 
						opacity: '0.3',
						transform: 'translateX(100%) scale(0.8)'
					}
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'flow': 'flow 3s linear infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'geometric-rotate': 'geometric-rotate 8s ease-in-out infinite',
				'crystalline-pulse': 'crystalline-pulse 4s ease-in-out infinite',
				'neural-flow': 'neural-flow 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 6s ease infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;