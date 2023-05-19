import styles from '@/styles/ReviewBar.module.css'

const ReviewBar = ({data}) => {
    return(<>
        {genBars(data)}
    </>);
}

function genBars(data) {
    let ret = []
    Object.entries(data).map((rating) => {
        let width = `${50 + (rating[1]/5 * 50)}%`;
        let colors = ["#ff4545", "#ffa534", "#ffe234", "#b7dd29", "#57e32c"];
        let c = colors[rating[1]-1];
        
        ret.push(
        <>
        <div className={styles.in} style={{background: `linear-gradient(to right,transparent 50%, ${c} 50% ${width}, transparent 0%)`}}>
            {rating[0]}
        </div>
        </>)
    })
    return ret;
}

export default ReviewBar;