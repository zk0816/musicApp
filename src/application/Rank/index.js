import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import {getRankList} from './store/index'
import Loading from '../../baseUI/Loading';
import {
  List, 
  ListItem,
  SongList,
  Container
} from './style';
import Scroll from '../../baseUI/Scroll/index';
import { EnterLoading } from './../Singers/style';
import { filterIndex } from '../../api/utils';
import { renderRoutes } from 'react-router-config';

const Rank = (props) => {
  const { rankList:list, loading } = props;

  const { getRankListDataDispatch } = props;

  useEffect (() => {
    if(!list.length){
      getRankListDataDispatch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let globalStartIndex = filterIndex(list);
  let officialList = list.slice(0, globalStartIndex);
  let globalList = list.slice(globalStartIndex);

  const enterDetail = (detail) => {
      props.history.push (`/rank/${detail.id}`) 
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt=""/>
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                { renderSongList(item.tracks)  }
              </ListItem>
            )
        })
        } 
      </List>
    )
  }

  let displayStyle = loading ? {"display":"none"}:  {"display": ""};
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
            { renderRankList(officialList) }
          <h1 className="global" style={displayStyle}>全球榜</h1>
            { renderRankList(globalList, true) }
          { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll> 
      {renderRoutes(props.route.routes)}
    </Container>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  rankList: state.getIn (['rank', 'rankList']).toJS(),
  loading: state.getIn (['rank', 'loading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch () {
      dispatch (getRankList());
    }
  }
};

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Rank));