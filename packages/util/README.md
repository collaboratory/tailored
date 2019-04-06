# @tailored/util
Utilities style helpers for tailored and styled-components. Leverages and extends the functionality of styled-system.

## API
@tailored/util exposes the following methods:

### convertColor
    * Convert an array of color/gradient strings to theme colors
    * Params:
        * {array} colors        An array of color/gradient strings
        * {object} themeColors  Theme colors config 

### convertColors
    * Convert a color/gradient string to a theme color
        * {string} entry        Color string to convert
        * {object} themeColors  Theme colors config

### float
    * styled-components support for the `float` css property

### display
    * styled-components support for the `display` property

### colors
    * styled-components support for the `color` and `background` css properties

### hoverColors
    * styled-components support for hover color modification

### customWidth
    * styled-components support for the `fullWidth` prop and `width` css property

### verticalAlign
    * styled-components support for the `verticalAlign` css property

### overrides
    * standard styled-components css property support
    * Properties supported:
        1. space
        2. customWidth
        3. height
        4. bg
        5. color
        5. display
        6. fontSize
        7. fontWeight
        8. borderRadius
        9. lineHeight
        10. textAlign
        11. float
        12. verticalAlign