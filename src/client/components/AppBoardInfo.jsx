import React from 'react';

const Info = () => {
    return (
      <div className="Info">
          Info
      </div>
    );
  }

const Title = () => {
    return (
      <div className="Title">
          Red Tetris
      </div>
    );
  }

const AppBoardInfo = () => {
    return (
        <div className="app-board-left">
            <Title/>
            <Info/>
        </div>
    )
}

export default AppBoardInfo;