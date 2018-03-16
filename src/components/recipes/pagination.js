import React, {Component} from 'react';

class Pagination extends Component {
  isNextDisabled = () => {
    if(this.props.pagination.page === this.props.pagination.totalPages) {
      return "disabled";
    }
  }
  isPreviousDisabled = () => {
    if(this.props.pagination.page === 1) {
      return "disabled";
    }
  }
  render() {
    let pages = [];
    for (let i = 0; i < this.props.pagination.totalPages; i++) {
      pages.push(
        <li className="page-item">
          <input type="button" value={i+1}
            onClick={(e) => this.props.changePage(e.target.value)}
            className="page-link" />
        </li>
      )
    }
    console.log(pages);
    return(
      <div>
        <nav className="fixed-bottom mr-1  justify-content-end" aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={"page-item " + this.isPreviousDisabled()}>
              <input type="button" value="Previous" onClick={(e) => this.props.changePage(e.target.value)} className="page-link" tabindex="-1" />
            </li>
            {pages}
            <li className={"page-item " + this.isNextDisabled()}>
              <input type="button" value="Next" onClick={(e) => this.props.changePage(e.target.value)} className="page-link" />
            </li>
            <select onChange={(e) => this.props.changeLimit(e.target.options[e.target.selectedIndex].text)}>
              <option>All</option>
              <option>1</option>
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination
