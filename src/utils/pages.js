// create additional nodes in the pages array to add more pages
// each node has 4 properties:
// title: the title of the page
// url: the url of the page
// previousPage: the url of the previous page
// nextPage: the url of the next page
// these are the nodes:
/** Choose your cup,
 * Choose your alliance,
 * Solve the riddle,
 * Your crossroads,
 * Solve the puzzle,
 * Test your calligraphy skills,
 * Embrace what in front of you,
 * Pursue your dreams,
 * Meet your inner self
 * */




const pages = [
    {
        title: "Welcome to CNY 2024",
        url: "/",
        previousPage: null,
        nextPage: "/when-were-you-born",
        sectionTitle: null,
        sectionIcon: null,
        bgImage: require("../images/background/0-cover.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 20s ease-in-out infinite alternate',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 130%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "When were you born?",
        url: "/when-were-you-born",
        previousPage: "/welcome-to-cny-2024",
        nextPage: "/welcome-noble-beings",
        sectionTitle: null,
        sectionIcon: null,
        bgImage: require("../images/background/1-introduction.jpg"),
        backgroundAnimation: {
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            animation: 'slide-scale 30s ease-in-out',
            animationName: 'slide-scale',
            animationDuration: '30s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes slide-scale {
                0% {
                    background-position: 50% 100%;
                    background-size: auto 120%;
                }
                100% {
                    background-position: 30% 100%;
                    background-size: auto 100%;
                }
            }
            `,
    },
    {
        title: "Welcome noble beings",
        url: "/welcome-noble-beings",
        previousPage: "/when-were-you-born",
        nextPage: "/choose-your-element",
        sectionTitle: "Introduction",
        sectionIcon: require("../images/icons/introduction.svg"),
        bgImage: require("../images/background/1-introduction.jpg"),
        backgroundAnimation: {
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            animation: 'slide-scale 30s ease-in-out',
            animationName: 'slide-scale',
            animationDuration: '30s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `@keyframes slide-scale {
            0% {
                background-position: 50% 100%;
                background-size: auto 120%;
            }
            100% {
                background-position: 30% 100%;
                background-size: auto 100%;
            }
        }`,
    },
    {
        title: "Choose your element",
        url: "/choose-your-element",
        previousPage: "/welcome-noble-beings",
        nextPage: "/choose-your-cup",
        sectionTitle: "Element",
        sectionIcon: require("../images/icons/element.svg"),
        bgImage: require("../images/background/2-element.jpg"),
        backgroundAnimation: {
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            animation: 'slide-scale 30s ease-in-out infinite alternate',
            animationName: 'slide-scale',
            animationDuration: '30s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `@keyframes slide-scale {
            0% {
                background-position: 50% 100%;
                background-size: auto 120%;
            }
            100% {
                background-position: 30% 100%;
                background-size: auto 100%;
            }
        }`,
    },
    {
        title: "Choose your cup",
        url: "/choose-your-cup",
        previousPage: "/choose-your-element",
        nextPage: "/choose-your-alliance",
        sectionTitle: "Traits",
        sectionIcon: require("../images/icons/traits.svg"),
        bgImage: require("../images/background/2-element.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Choose your alliance",
        url: "/choose-your-alliance",
        previousPage: "/choose-your-cup",
        nextPage: "/solve-the-riddle",
        sectionTitle: "Alliance",
        sectionIcon: require("../images/icons/alliance.svg"),
        bgImage: require("../images/background/3-trait.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Solve the riddle",
        url: "/solve-the-riddle",
        previousPage: "/choose-your-alliance",
        nextPage: "/your-crossroads",
        sectionTitle: "Riddle",
        sectionIcon: require("../images/icons/riddle.svg"),
        bgImage: require("../images/background/5-alliance.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Your crossroads",
        url: "/your-crossroads",
        previousPage: "/solve-the-riddle",
        nextPage: "/solve-the-puzzle",
        sectionTitle: "Path",
        sectionIcon: require("../images/icons/path.svg"),
        bgImage: require("../images/background/4-path.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Solve the puzzle",
        url: "/solve-the-puzzle",
        previousPage: "/your-crossroads",
        nextPage: "/test-your-calligraphy-skills",
        sectionTitle: "Puzzle",
        sectionIcon: require("../images/icons/puzzle.svg"),
        bgImage: require("../images/background/6-puzzle.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Test your calligraphy skills",
        url: "/test-your-calligraphy-skills",
        previousPage: "/solve-the-puzzle",
        nextPage: "/embrace-whats-in-front-of-you",
        sectionTitle: "Calligraphy",
        sectionIcon: require("../images/icons/calligraphy.svg"),
        bgImage: require("../images/background/7-calligraphy.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Embrace what's in front of you",
        url: "/embrace-whats-in-front-of-you",
        previousPage: "/test-your-calligraphy-skills",
        nextPage: "/pursue-your-dreams",
        sectionTitle: "Spot the Difference",
        sectionIcon: require("../images/icons/spot-the-difference.svg"),
        bgImage: require("../images/background/8-spot-the-difference.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Pursue your dreams",
        url: "/pursue-your-dreams",
        previousPage: "/embrace-whats-in-front-of-you",
        nextPage: "/meet-your-inner-self",
        sectionTitle: null,
        sectionIcon: null,
        bgImage: require("../images/background/9-result.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
    {
        title: "Meet your inner self",
        url: "/meet-your-inner-self",
        previousPage: "/pursue-your-dreams",
        nextPage: undefined,
        sectionTitle: null,
        sectionIcon: null,
        bgImage: require("../images/background/10-result-animal.jpg"),
        backgroundAnimation: {
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'scale-down 10s',
            animationName: 'scale-down',
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
        },
        styles: `
            @keyframes scale-down {
                0% {
                    background-size: auto 120%;
                }
                100% {
                    background-size: auto 100%;
                }
            }
          `,
    },
];

export default pages;
