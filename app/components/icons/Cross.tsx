export const Cross: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11" width="1" height="23" fill={props.color}/>
    <rect x="23" y="11" width="1" height="23" transform="rotate(90 23 11)" fill={props.color}/>
    </svg>  
);