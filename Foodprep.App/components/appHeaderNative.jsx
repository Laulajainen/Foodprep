import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

function AppHeader() {
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);

  const toggleOffcanvas = () => {
    setOffcanvasVisible(!isOffcanvasVisible);
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleOffcanvas} style={styles.navbarToggler}>
          <Text style={styles.navbarTogglerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.navbarBrand}>FoodPrep</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isOffcanvasVisible}
        onRequestClose={toggleOffcanvas}
      >
        <View style={styles.offcanvas}>
          <View style={styles.offcanvasHeader}>
            <Button title="Close" onPress={toggleOffcanvas} />
          </View>
          <View style={styles.offcanvasBody}>
            <TouchableOpacity style={styles.navItem} onPress={toggleOffcanvas}>
              <Text style={styles.navLink}>Foodprep</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={toggleOffcanvas}>
              <Text style={styles.navLink}>Recept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={toggleOffcanvas}>
              <Text style={styles.navLink}>Listor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={toggleOffcanvas}>
              <Text style={styles.navLink}>Veckoplanerare</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={toggleOffcanvas}>
              <Text style={styles.navLink}>Dagbok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#343a40',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarToggler: {
    padding: 10,
  },
  navbarTogglerIcon: {
    color: 'white',
    fontSize: 24,
  },
  navbarBrand: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  offcanvas: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 50,
  },
  offcanvasHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  offcanvasBody: {
    marginTop: 20,
  },
  navItem: {
    marginVertical: 10,
  },
  navLink: {
    fontSize: 18,
  },
});

export default AppHeader;