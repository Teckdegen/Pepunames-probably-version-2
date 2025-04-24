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
				terminal: {
					purple: '#9b87f5',
					'deep-purple': '#7E69AB',
					'dark-purple': '#1A1F2C',
					'light-purple': '#D6BCFA',
					'neon-purple': '#B347EA',
					'soft-green': '#84cc16',
					'soft-blue': '#60a5fa',
					'soft-orange': '#fb923c',
					'soft-pink': '#f472b6',
				},
				'cyber': {
					'neon': '#00ff9f',
					'purple': '#b347ea',
					'blue': '#0891b2',
					'pink': '#ff49db',
					'yellow': '#ffd700'
				},
				'glass': {
					'light': 'rgba(255, 255, 255, 0.1)',
					'dark': 'rgba(0, 0, 0, 0.1)'
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
				'terminal-cursor': {
					'0%, 100%': { opacity: '0' },
					'50%': { opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'pulse-glow': {
					'0%': { 
						boxShadow: '0 0 15px 5px rgba(155, 135, 245, 0.4)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 25px 10px rgba(155, 135, 245, 0.6)',
						transform: 'scale(1.03)'
					},
					'100%': { 
						boxShadow: '0 0 15px 5px rgba(155, 135, 245, 0.4)',
						transform: 'scale(1)'
					}
				},
				'floating': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(179, 71, 234, 0.5)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(0, 255, 159, 0.7)',
						transform: 'scale(1.02)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'shine': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(200%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'terminal-cursor': 'terminal-cursor 1s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'floating': 'floating 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'shine': 'shine 2s linear infinite'
			},
			fontFamily: {
				mono: ['JetBrains Mono', 'monospace'],
				sans: ['Inter', 'sans-serif']
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-terminal': 'linear-gradient(to bottom right, #9b87f5, #7E69AB)',
				'gradient-purple-pink': 'linear-gradient(135deg, #9b87f5 0%, #f472b6 100%)',
				'gradient-blue-purple': 'linear-gradient(135deg, #60a5fa 0%, #9b87f5 100%)',
				'gradient-green-blue': 'linear-gradient(135deg, #84cc16 0%, #60a5fa 100%)',
				'gradient-orange-pink': 'linear-gradient(135deg, #fb923c 0%, #f472b6 100%)',
				'gradient-cyber': 'linear-gradient(109.6deg, rgba(62, 161, 219, 0.8) 11.2%, rgba(93, 52, 236, 0.8) 100.2%)',
				'mesh-purple': 'radial-gradient(circle at 50% 50%, rgba(155, 135, 245, 0.2) 0%, rgba(155, 135, 245, 0) 50%)',
				'cyber-gradient': 'linear-gradient(135deg, #b347ea 0%, #00ff9f 100%)',
				'neon-glow': 'radial-gradient(circle at 50% 50%, rgba(179, 71, 234, 0.2) 0%, rgba(0, 255, 159, 0.1) 100%)',
				'glass-shine': 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)'
			},
			boxShadow: {
				'glow-sm': '0 0 5px 0 rgba(155, 135, 245, 0.3)',
				'glow-md': '0 0 10px 0 rgba(155, 135, 245, 0.5)',
				'glow-lg': '0 0 20px 0 rgba(155, 135, 245, 0.7)',
				'neon': '0 0 5px #9b87f5, 0 0 10px #9b87f5, 0 0 15px #9b87f5, 0 0 20px #9b87f5',
				'cyber': '0 0 20px rgba(179, 71, 234, 0.5), 0 0 40px rgba(0, 255, 159, 0.3)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
