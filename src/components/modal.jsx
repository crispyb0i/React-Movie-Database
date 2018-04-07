import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      background: 'url("http://ak5.picdn.net/shutterstock/videos/20361445/thumb/10.jpg") center',
      // background:'url("https://image.freepik.com/free-vector/modern-gray-abstract-background-with-floating-shapes_1048-5397.jpg") top',
      backgroundColor: '#fff',
      backgroundSize: 600,
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      maxHeight: 600,
      margin: '0 auto',
      padding: 30,
      overflow: 'scroll'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
