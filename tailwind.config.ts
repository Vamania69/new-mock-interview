import type { Config } from "tailwindcss";
// const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#060606',
				content: '#9F9F9F',
				error: '#DB4B4B',
				success: '#44955A',
				modal: 'var(--modal)',
				icon: {
					DEFAULT: 'var(--icon)',
					foreground: 'var(--icon-foreground)',
				},
				input: 'var(--input)',
				ring: 'var(--ring)',
				foreground: 'var(--foreground)',
				placeholder: 'var(--placeholder)',
				"foreground-02": 'var(--foreground-02)',

				'editor-js-dropdown-item': '#3C4758',
				header: {
					DEFAULT: 'var(--header)',
					foreground: 'var(--header-foreground)'
				},
				background: {
					DEFAULT: 'var(--background)',
					secondary: 'var(--background-secondary)',
					auth: 'var(--background-auth)',
					"auth-secondary": '#1890EA'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',

					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)',
					"foreground-selected": 'var(--popover-foreground-selected)',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				"action-required": {
					DEFAULT: 'var(--action-required)',
					foreground: 'var(--action-required-foreground)'
				},
				tooltip: 'var(--tooltip)',
				"user-badge": {
					DEFAULT: 'var(--user-badge)',
				},
				gray: {
					'01': 'var(--gray-01)',
					'02': 'var(--gray-02)',
					'03': 'var(--gray-03)',
					'04': 'var(--gray-04)',
					'05': 'var(--gray-05)',
					'06': 'var(--gray-06)',
					'07': 'var(--gray-07)',
					'08': 'var(--gray-08)',
					'09': 'var(--gray-09)',
					'10': 'var(--gray-10)',
					'11': 'var(--gray-11)',
					'12': 'var(--gray-12)',
					'13': 'var(--gray-13)',
					'14': 'var(--gray-14)',
					'15': 'var(--gray-15)',
					'16': 'var(--gray-16)',
					'17': 'var(--gray-17)',
					'18': 'var(--gray-18)',
					'19': 'var(--gray-19)',
					'20': 'var(--gray-20)',
					'21': 'var(--gray-21)',
					'22': 'var(--gray-22)',
					'23': 'var(--gray-23)',
					'24': 'var(--gray-24)',
					'25': 'var(--gray-25)',
					'26': 'var(--gray-26)',
					'27': 'var(--gray-27)',
					'28': 'var(--gray-28)',
					'29': 'var(--gray-29)',
					'30': 'var(--gray-30)',
					'31': 'var(--gray-31)',
					'32': 'var(--gray-32)',
					'33': 'var(--gray-33)',
					'34': 'var(--gray-34)',
					'35': 'var(--gray-35)',
					'36': 'var(--gray-36)',
					'37': 'var(--gray-37)',
					'38': 'var(--gray-38)',
					'39': 'var(--gray-39)',
					'40': 'var(--gray-40)',
					'41': 'var(--gray-41)',
					'42': 'var(--gray-42)',
					'43': 'var(--gray-43)',
					'44': 'var(--gray-44)',
					'45': 'var(--gray-45)',
					'46': 'var(--gray-46)',
					'47': 'var(--gray-47)',
					'48': 'var(--gray-48)',
					'49': 'var(--gray-49)',
					'50': 'var(--gray-50)',
					'51': "var(--gray-51)",
					'52': "var(--gray-52)",
					'53': "var(--gray-53)",


				},
				text: {
					'hover': 'var(--text-hover)',
					'over': 'var(--text-over)',
					'01': 'var(--text-01)',
					'03': 'var(--text-03)',
					'05': 'var(--text-05)',
					'06': 'var(--text-06)',
					'07': 'var(--text-07)',
					'09': 'var(--text-09)',
					'10': 'var(--text-10)',
					'11': 'var(--text-11)',
					'12': 'var(--text-12)',
					'15': 'var(--text-15)',
					'17': 'var(--text-17)',
					'18': 'var(--text-09)',
					'20': 'var(--text-20)',
					'21': 'var(--text-21)',
					'22': 'var(--text-22)',
					'23': 'var(--text-23)',
					'25': 'var(--text-25)',
					'28': 'var(--text-28)',
					'29': 'var(--text-29)',
					'30': 'var(--text-30)',
					'31': 'var(--text-31)',
					'32': 'var(--text-32)',
					'33': 'var(--text-33)',
					'34': 'var(--text-34)',
					'35': 'var(--text-35)',
					'37': 'var(--text-37)',
					'38': 'var(--text-38)',
					'39': 'var(--text-39)',
					'40': 'var(--text-40)',
					'41': 'var(--text-41)',
					'42': 'var(--text-42)',
					'44': 'var(--text-44)',
					'45': 'var(--text-45)',
					'46': 'var(--text-46)',
					'47': 'var(--text-47)',
					'48': 'var(--text-48)',
					'49': 'var(--text-49)',
					'51': 'var(--text-51)',
					'52': 'var(--text-52)',
					'53': 'var(--text-53)',
					'55': 'var(--text-55)',
					'58': 'var(--text-58)',
					'59': 'var(--text-59)',
					'60': 'var(--text-60)',
					'61': 'var(--text-61)',
					'62': 'var(--text-62)',
					'63': 'var(--text-63)',
					'64': 'var(--text-64)',
					'65': 'var(--text-65)',
				},

				forground: {
					'grey-deep': 'var(--grey-deep)',
				},
				btn: {
					'color-01': 'var(--esop-btn)',
				},

				green: {
					dark: '#212829',
					'01': 'var(--green-01)',
					'02': 'var(--green-02)',
					'03': 'var(--green-03)',
					'04': 'var(--green-04)',
					'05': 'var(--green-05)',
				},
				border: {
					DEFAULT: 'var(--border-primary)',
					primary: 'var(--border-primary)',
					'secondary': 'var(--border-secondary)',
					'card': 'var(--border-card)',
					'table': 'var(--border-table)',
					'03': 'var(--border-03)',
					'04': '#C1C9D4',
					'nav': 'var(--border-nav)',

				},

				yellow: {
					'01': 'var(--yellow-01)',
					'02': 'var(--yellow-02)',
					'03': 'var(--yellow-03)',
				},
				pink: {
					DEFAULT: '#8B36F7',
					light: '#8B36F726',
					'01': 'var(--pink-01)',
				},

				brown: {

					'01': 'var(--brown-01)',
				},

				purple: {
					'01': 'var(--purple-01)',
					'02': 'var(--purple-02)',
					'03': 'var(--purple-03)',
					'04': 'var(--purple-04)',
					'05': 'var(--purple-05)',
					'06': 'var(--purple-06)',
					'07': 'var(--purple-07)',
					'08': 'var(--purple-08)',
					'09': 'var(--purple-09)',
					'10': 'var(--purple-10)',

				},
				black: {
					'DEFAULT': '#000000',
					'01': 'var(--black-01)',
					'02': 'var(--black-02)',
					'03': 'var(--black-03)',
					'04': 'var(--black-04)',
					'05': 'var(--black-05)',

				},

				white: {
					'DEFAULT': '#FFFFFF',
					'01': 'var(--white-01)',
					'02': 'var(--white-02)',

				},

				red: {
					'01': 'var(--red-01)',
					'02': 'var(--red-02)',
					'03': 'var(--red-03)',
					'04': 'var(--red-04)',
					'05': 'var(--red-05)',
				},
				blue: {
					DEFAULT: '#3678DE',
					primary: '#3678DE',
					secondary: '#3AA2F0',
					'03': '#7E8AB5',
					'04': 'var(--blue-04)',
					'05': 'var(--blue-05)',
					'06': 'var(--blue-06)',
					'07': 'var(--blue-07)',
					'08': 'var(--blue-08)',
					'09': 'var(--blue-09)',
					'10': 'var(--blue-10)',
					'11': 'var(--blue-11)',
					'12': 'var(--blue-12)',
					'13': 'var(--blue-13)',
					'14': 'var(--blue-14)',
					'15': 'var(--blue-15)',
					'16': 'var(--blue-16)',
					'17': 'var(--blue-17)',
					'18': 'var(--blue-18)',
					'19': 'var(--blue-19)',
					'20': 'var(--blue-20)',
					'21': 'var(--blue-21)',
					'22': 'var(--blue-22)',
					'23': 'var(--blue-23)',
					'24': 'var(--blue-24)',
					'25': 'var(--blue-25)',
					'26': 'var(--blue-26)',
					'27': 'var(--blue-27)',
					'28': 'var(--blue-28)',
					'29': 'var(--blue-29)',
					'30': 'var(--blue-30)',
					'31': 'var(--blue-31)',
					'32': 'var(--blue-32)',
					'33': 'var(--blue-33)',
					'34': 'var(--blue-34)',
					'35': 'var(--blue-35)',


					// light: '#3655C526',
				},
				"scrollbar-thumb": "var(--scrollbar-thumb-bg)",
				status: {
					success: {
						DEFAULT: "var(--status-success)",
						foreground: 'var(--status-success-foreground)',
					},
					pending: {
						DEFAULT: 'var(--pending)',
						foreground: 'var(--pending-foreground)',
					},
					rejected: {
						DEFAULT: 'var(--rejected)',
						foreground: 'var(--rejected-foreground)',
					},
					vesting: {
						DEFAULT: 'var(--vesting)',
						foreground: 'var(--vesting-foreground)',
					},
					vested: {
						DEFAULT: 'var(--vested)',
						foreground: 'var(--vested-foreground)',
					},
					complete: {
						DEFAULT: 'var(--complete)',
						foreground: 'var(--complete-foreground)',
					},
					surrendered: {
						DEFAULT: 'var(--surrendered)',
						foreground: 'var(--surrendered-foreground)',
					},
					draft: {
						DEFAULT: 'var(--draft)',
						foreground: 'var(--draft-foreground)',
					},
					custom: {
						DEFAULT: 'var(--custom)',
						foreground: 'var(--custom-foreground)',
					},
					"not-converted": {
						DEFAULT: 'var(--not-converted)',
						foreground: 'var(--not-converted-foreground)',
					},
					'employee-sign-pending': '#C5A536',
					'employee-sign-pending-bg': '#C5A53626',
					'company-sign-pending': '#A585FF',
					'company-sign-pending-bg': '#936DFF26',
				},
				table: {
					secondary: {
						header: 'var(--table-header-secondary)',
						"header-foreground": 'var(--table-header-secondary-foreground)'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},

			animation: {
				scroll:
					"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",

			},
			keyframes: {
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
// function addVariablesForColors({ addBase, theme }: any) {
// 	let allColors = flattenColorPalette(theme("colors"));
// 	let newVars = Object.fromEntries(
// 		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
// 	);

// 	addBase({
// 		":root": newVars,
// 	});
// }
export default config;
