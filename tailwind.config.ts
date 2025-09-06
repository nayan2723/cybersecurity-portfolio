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
				cyber: {
					green: 'hsl(var(--cyber-green))',
					blue: 'hsl(var(--cyber-blue))',
					purple: 'hsl(var(--cyber-purple))',
					pink: 'hsl(var(--neon-pink))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'morph': {
					'0%, 100%': {
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
						transform: 'translate3d(0, 0, 0) rotateZ(0deg)'
					},
					'34%': {
						borderRadius: '70% 60% 70% 30% / 50% 60% 30% 60%',
						transform: 'translate3d(5px, -6px, 0) rotateZ(-5deg)'
					},
					'67%': {
						borderRadius: '100% 100% 60% 60% / 100% 100% 60% 60%',
						transform: 'translate3d(-3px, 6px, 0) rotateZ(3deg)'
					}
				},
				'morph-reverse': {
					'0%, 100%': {
						borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
						transform: 'translate3d(0, 0, 0) rotateZ(0deg)'
					},
					'34%': {
						borderRadius: '30% 70% 40% 60% / 60% 40% 70% 50%',
						transform: 'translate3d(-4px, 5px, 0) rotateZ(4deg)'
					},
					'67%': {
						borderRadius: '60% 60% 100% 100% / 60% 60% 100% 100%',
						transform: 'translate3d(2px, -4px, 0) rotateZ(-2deg)'
					}
				},
				'morph-slow': {
					'0%, 100%': {
						borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%',
						transform: 'translate3d(0, 0, 0) rotateZ(0deg) scale(1)'
					},
					'25%': {
						borderRadius: '80% 20% 80% 20% / 20% 80% 20% 80%',
						transform: 'translate3d(2px, -2px, 0) rotateZ(2deg) scale(1.05)'
					},
					'50%': {
						borderRadius: '20% 80% 20% 80% / 80% 20% 80% 20%',
						transform: 'translate3d(-2px, 2px, 0) rotateZ(-2deg) scale(0.95)'
					},
					'75%': {
						borderRadius: '80% 20% 80% 20% / 20% 80% 20% 80%',
						transform: 'translate3d(1px, -1px, 0) rotateZ(1deg) scale(1.02)'
					}
				},
				'rain': {
					'0%': {
						transform: 'translateY(-100px)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(300px)',
						opacity: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'float-delayed': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-8px)'
					}
				},
				'float-slow': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-6px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'float-delayed': 'float-delayed 4s ease-in-out infinite 0.5s',
				'float-slow': 'float-slow 5s ease-in-out infinite 1s',
				'glow': 'glow 2s ease-in-out infinite alternate'
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
				'inter': ['Inter', 'sans-serif']
			},
			backgroundImage: {
				'cyber-gradient': 'var(--gradient-cyber)',
				'dark-gradient': 'var(--gradient-dark)',
				'glow-gradient': 'var(--gradient-glow)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
