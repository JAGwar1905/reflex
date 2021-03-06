import * as React from "react"
import { Global } from "@emotion/core"
import { ComponentWithStyleProps } from "./types"
import { jsx, get, css, useTheme, Theme, ThemeUIProvider } from "./react-jsx"

export interface GlobalStylesProps {
  theme: Theme
}

export const GlobalStyles = ({ theme }) => {
  const globalStyles = get(theme, "styles.global")
  if (!globalStyles) return null
  return (
    <Global
      styles={() => {
        return css(globalStyles)(theme)
      }}
    />
  )
}

export const ThemeProvider = ({ children, ...props }) => {
  const { theme } = props
  return (
    <ThemeUIProvider theme={theme} {...props}>
      <GlobalStyles theme={theme} />
      {children}
    </ThemeUIProvider>
  )
}

export const Box = React.forwardRef(
  ({ as = "div", ...props }: ComponentWithStyleProps<"div">, ref) => {
    return jsx(as, {
      ref,
      ...props,
    })
  }
)

export const Container = React.forwardRef(
  (props: ComponentWithStyleProps<"div">, ref) => {
    return <Box ref={ref} variant="container" {...props} />
  }
)

export const Flexbox = React.forwardRef(
  (props: ComponentWithStyleProps<"div">, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    />
  )
)

export const Flex = Flexbox

export const Grid = React.forwardRef(
  (props: ComponentWithStyleProps<"div">, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "grid",
        gridAutoFlow: "dense",
      }}
      {...props}
    />
  )
)

export const VisuallyHidden = React.forwardRef(
  (props: ComponentWithStyleProps<"div">, ref) => (
    <Box
      ref={ref}
      sx={{
        position: "absolute",
        top: "auto",
        overflow: "hidden",
        clipPath: "rect(1px, 1px, 1px, 1px)",
        width: "1px",
        height: "1px",
        whiteSpace: "nowrap",
      }}
      {...props}
    />
  )
)

export interface IconProps extends ComponentWithStyleProps<"svg"> {}

export const Icon = ({ name, size = 4, ...props }: IconProps) => {
  const { theme } = useTheme()
  return theme.icons && theme.icons[name] ? (
    <svg
      fill="currentColor"
      dangerouslySetInnerHTML={{
        __html: theme.icons[name],
      }}
      size={size}
      {...props}
    />
  ) : null
}
