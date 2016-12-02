/**
 * Created by YouHan on 2016/11/30.
 */
import React, {Component} from "react";
import {Text, View, StyleSheet, Dimensions, Image, ScrollView} from "react-native";

const vw = (percentageWidth) => {
  return Dimensions.get('window').width * (percentageWidth / 100);
};

class CustomImage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      width: 100,
      height: 100
    };
    
    this._ref = null;
    
    this.loadEnd = this.loadEnd.bind(this);
  }
  
  loadEnd() {
    const me = this;
    if (me._ref) {
      Image.getSize(this.props.uri, (w, h) => {
        me.setState({
          width: me.pWidth,
          height: me.pWidth * h / w
        });
      }, (error) => {
        console.error(error);
      });
    }
  }
  
  render() {
    return (
      <View onLayout={(event) => {
        this.pWidth = event.nativeEvent.layout.width;
      }} style={{backgroundColor: 'black'}}>
        <Image
          {...this.props}
          source={{uri: this.props.uri}}
          style={[this.props.style, {
            width: this.state.width,
            height: this.state.height
          }]} onLoadEnd={this.loadEnd}
          ref={(ref) => {
            this._ref = ref;
          }}
        >
        </Image>
      </View>
    );
  }
}


export default class Dribbble extends Component {
  constructor(props) {
    super(props);
    
    this.token = 'c1e80e1ce0f13887e3c0f90c660d33d41ab29166002408999051f26d2da615d8';
    this.page = 1;
    this.per_page = 20;
    this.URI = `https://api.dribbble.com/v1/shots?sort=recent&page=${this.page}&per_page=${this.per_page}&access_token=${this.token}`;
    this.VIEWICON = 'https://d13yacurqjgara.cloudfront.net/assets/icon-views-sm-7046a1e57d41dd2fa0837acd30313dc29c5ce5d505d935a465cb9767dc331a43.png';
    this.LIKEICON = 'http://oh3ak9cxq.bkt.clouddn.com/icon-comments-3d8aeb584a027f56fc85b2ffadac00756e2b9e91c9242ac148fe71d101a120eb%5B1%5D.png';
    
    this.state = {
      dribbbleList: []
    };
    
    this.getDribbble = this.getDribbble.bind(this);
  }
  
  componentWillMount() {
    this.getDribbble();
  }
  
  getDribbble() {
    const me = this;
    return fetch(me.URI)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        me.setState({
          dribbbleList: data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render() {
    return (
      <ScrollView style={{
        flex: 1,
      }}>
        <View style={styles.container}>
          {this.state.dribbbleList.map((shot) => {
            return (
              <View style={styles.item} key={shot.id}>
                <CustomImage uri={shot.images.normal} />
                <View>
                  <Text>{shot.title}</Text>
                  <View style={styles.itemContent}>
                    <View style={{flex: 1}} />
                    <Image source={{uri: this.VIEWICON}} style={{width: 12, height: 12}} />
                    <Text>{shot.views_count}</Text>
                    <Image source={{uri: this.LIKEICON}} style={{width: 12, height: 12,}} />
                    <Text>{shot.likes_count}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  item: {
    width: vw(50),
    padding: 5,
    flexDirection: 'column'
  },
  itemContent: {
    flexDirection: 'row',
    padding: 3
  }
});