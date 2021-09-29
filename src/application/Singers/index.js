import React, {useEffect} from 'react';
import Horizen from '../../baseUI/HorizenItem';
import { categoryTypes,alphaTypes,singerTypes } from '../../api/mockdata';
import { NavContainer,ListContainer,List,ListItem } from "./style";
import Scroll from './../../baseUI/Scroll/index';
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators';
import {connect} from 'react-redux';
import Loading from '../../baseUI/Loading/index';
import  LazyLoad, {forceCheck} from 'react-lazyload';
import { useContext } from 'react';
import { CategoryDataContext,CHANGE_CATEGORY, CHANGE_ALPHA, Data,CHANGE_TYPE } from './data';
import { renderRoutes } from 'react-router-config';


const Singers = (props) => {
  // let [type,setType] = useState() //分类
  // let [category, setCategory] = useState(); //地区分类
  // let [alpha, setAlpha] = useState(); //字母
  const {data,dispatch} = useContext(CategoryDataContext)

  const {type,category, alpha} = data.toJS();

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

  //默认热门歌手
  useEffect(() => {
    if (!singerList.length) {
      getHotSingerDispatch ();
    }
    // eslint-disable-next-line
  }, []);

  //按分类查询
  let handleUpdateType = (val) => {
    // setType(val);
    dispatch ({type: CHANGE_TYPE, data: val});
    updateDispatch(val,category, alpha);
  }

  //按字母
  let handleUpdateAlpha = (val) => {
    // setAlpha(val);
    dispatch ({type: CHANGE_ALPHA, data: val});
    updateDispatch(type,category,val);
  }

  //按地区
  let handleUpdateCatetory = (val) => {
    // setCategory(val);
    dispatch ({type: CHANGE_CATEGORY, data: val});
    updateDispatch(type,val, alpha);
  }

  //上拉加载
  const handlePullUp = () => {
    if (type || category || alpha) {
      pullUpRefreshDispatch (type,category, alpha, false, pageCount);
    } else {
      pullUpRefreshDispatch (type,category, alpha, true, pageCount);
    }
  };

  //下拉刷新
  const handlePullDown = () => {
    pullDownRefreshDispatch (type,category, alpha);
  };

  const enterDetail = (id)  => {
    props.history.push (`/singers/${id}`);
  };

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => enterDetail (item.id)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  return (
    <div>
      <Data>
        <NavContainer>
        <Horizen 
          list={singerTypes} 
          title={"按类型(默认热门):"} 
          handleClick={val => handleUpdateType(val)} 
          oldVal={type}></Horizen>
        <Horizen 
          list={categoryTypes} 
          title={"按地区:"} 
          handleClick={handleUpdateCatetory} 
          oldVal={category}></Horizen>
        <Horizen 
          list={alphaTypes} 
          title={"首字母:"} 
          handleClick={val => handleUpdateAlpha (val)} 
          oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll 
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
          onScroll={forceCheck}
        >
          { renderSingerList () }
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
      </Data>
      { renderRoutes (props.route.routes) }
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(type,category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(type,category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(type,category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(type,category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(type,category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(type,category, alpha));
      }
    }
  }
}; 

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));