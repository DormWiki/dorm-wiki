import styles from '@/styles/ReviewBar.module.css'

const ReviewBar = ({data}) => {
    return(<>
        {genBars(data)}
    </>);
}

function genBars(data) {
    let ret = []
    Object.entries(data).map((rating) => {
        let width = `${rating[1]/5 * 100}%`;
        let colors = ["#ff4545", "#ffa534", "#ffe234", "#b7dd29", "#57e32c'"];
        let c = colors[rating[1]];
        
        ret.push(
        <>
        <div className={styles.out}>
            <div className={styles.in} style={{background: `linear-gradient(90deg, ${c} ${width}, white 0%)`}}>
                {rating[0]} <span className={styles.right}>{rating[1]}/5</span>
            </div>
        </div>
        </>)
    })
    return ret;
}

export default ReviewBar;