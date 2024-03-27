import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Image } from 'react-native'
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={{ background: "pink", flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ borderRadius: 100, width: "95%", marginLeft: "5%", height: 40, backgroundColor: 'grey' }}
        icon={() => <Image source={require('../../../assets/Avatar.png')} style={{ height: 20, width: 20 }} />}
      />
    </View>
  );
};
export default SearchBar;