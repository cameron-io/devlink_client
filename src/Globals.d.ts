declare module '*.css'
declare module '*.scss'
declare module '*.gif'
declare module '*.module.css' {
    const classes: { [key: string]: string }
    export default classes
}
