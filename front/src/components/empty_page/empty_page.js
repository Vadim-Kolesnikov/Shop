import "./empty_page.css"

function EmptyPage(props) {
    return (
      <div className="emptyPage titleText">
        {props.text}
      </div>
    );
  }


  export default EmptyPage;