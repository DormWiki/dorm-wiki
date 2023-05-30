import styles from '@/styles/ReviewBar.module.css'

const ReviewBar = ({data}) => {
    return(<>
        {genBars(data)}
    </>);
}

function genBars(data) {
    let ret = []
    Object.entries(data).map((rating, i) => {
        let colors = ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D", "#4D908E"];
        let width = `${50 + (rating[1] / colors.length * 50)}%`;
        let c = colors[Math.floor(rating[1])-1];
        ret.push(
          <>
            <div
              key={i}
              className={styles.in}
              style={{
                background: `linear-gradient(to right,transparent 50%, ${c} 50% ${width}, white 0%)`,
              }}
            >
              {rating[0]}
            </div>
          </>
        );
    })
    return ret;
}

export default ReviewBar;