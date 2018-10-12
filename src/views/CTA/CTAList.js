import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {List} from 'react-native-elements';
import { fetchCTAs } from '../../services/CTA';
import {updateCTAState, handleLoadMore, loadCtas} from "../../actions/cta";
import {connect} from 'react-redux';
import CTAView from './../../views/CTA/CTAView';
import { CtaDetailView } from './CtaDetailView';

class CTAList extends React.Component {

    componentDidMount() {
        this.loadCtas();
    }

    loadCtas = () => {
        const {ctas} = this.props;

        console.log("CTAs loading");
        fetchCTAs().then(res => {
            let data = res.data;
            this.props.loadCtas(ctas.length === 0 ? data.ctas : [...ctas, ...data.ctas], false);
        });
    }

    render() {
        const { ctas, isRefreshing, selectedCta } = this.props;
        if(selectedCta == null){
            return (
                <List style={{flex: 1, backgroundColor: 'green'}} contentContainerStyle={{flex: 1}} containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={ctas}
                            renderItem={({item})=>{return (<CTAView item={item}></CTAView>)}}
                            keyExtractor={(item, index) => index+""}
                            refreshing={isRefreshing}
                            onRefresh={()=>{this.props.resetState(); this.loadCtas();}}
                            onEndThreshold={0.1}
                        />
                </List>
            );
        }else{
            return (
                <CtaDetailView item={this.props.selectedCta}></CtaDetailView>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        ctas: state.app.cta.ctas,
        selectedCta: state.app.cta.selectedCta,
        isLoading: state.app.cta.isLoading,
        isRefreshing: state.app.cta.isRefreshing,
        searchText: state.app.searchText
    }
  }
  
  const mapDispatchersToProps = dispatch => {
    return {
        loadCtas: (ctas, isRefreshing) => {
            dispatch(loadCtas(ctas, isRefreshing));
        },
        resetState: () => {
            dispatch(updateCTAState({ctas: [], selectedCta: null, isRefreshing: true}));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(CTAList);