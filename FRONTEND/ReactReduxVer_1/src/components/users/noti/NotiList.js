import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { fetchNoties } from '../../../actions/users/notiActions';

class NotiList extends Component {
  componentWillMount(){
    this.props.fetchNoties();
  }

  renderNoties(){
    return this.props.noties.map((noti, index) => {
      return (
        <tr key={index}>
          <td>index</td>
          <td>noti.title</td>
        </tr>
      )
    })
  }
  render() {if( this.noties === undefined ) {
    return <div>Loading...</div>
}
    return(
      <div>
        <Table hover>
          <thead>
          <tr>
            <th>No.</th>
            <th>내용</th>
          </tr>
          </thead>
          <tbody>
            {this.renderNoties()}
          </tbody>
        </Table>
      </div>
    )
  }
}
function mapStateToProps(state){
  return { noties: state.noties.all }
}

export default connect(mapStateToProps, { fetchNoties })(NotiList);