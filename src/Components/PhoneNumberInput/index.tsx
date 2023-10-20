import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../Constants/colors';
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import Modal from 'react-native-modal'; // Import the modal component

interface PhoneNumberInputProps {
  value: string;
  setValue: (text: string) => void;
  setSelectedCountryCode:(text: string) => void;
}

const PhoneNumberInput: FunctionComponent<PhoneNumberInputProps> = ({
  value,
  setValue,
  setSelectedCountryCode
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('IN'); // Default country code
  
  const oninputchange = (txt) => {    
    setValue(txt);
  };


  const onSelectCountry = (country: Country) => {
    console.log(country.callingCode[0]);
    let phcodes = "+"+country.callingCode[0];
    setSelectedCountryCode(phcodes);
    setSelectedCountry(country.cca2);
    setCountryPickerVisible(false); // Close the country picker modal
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        style={styles.countryPickerContainer}
        onPress={() => setCountryPickerVisible(true)} // Open the country picker modal
      >
        <CountryPicker
          withFilter
          withFlag
          withAlphaFilter
          withCallingCodeButton
          countryCode={selectedCountry}
          onSelect={onSelectCountry}
          translation="eng" // Optional: specify language
          visible={isCountryPickerVisible} // Show the CountryPicker only when the modal is open
          containerButtonStyle={styles.countryPickerButton}
          countryContainerStyle={styles.countryContainer} // Style for each country row
          countryNameStyle={styles.countryName} // Style for country name
          callingCodeStyle={styles.callingCode} // Style for calling code
          flagStyle={styles.flag} // Style for the flag
        />
      </TouchableOpacity>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={colors.placeholdercolor}
          keyboardType="phone-pad"
          style={styles.input}
          value={value}
          onChangeText={oninputchange}
          textAlignVertical="center"
          secureTextEntry={isPasswordVisible}
        />
      </View>

      {/* Country Picker Modal */}
      <Modal isVisible={isCountryPickerVisible}>
        <View style={styles.modalContainer}>
          <CountryPicker
            withFilter
            withFlag
            withAlphaFilter
            withCallingCode
            countryCode={selectedCountry}
            onSelect={onSelectCountry}
            translation="eng" // Optional: specify language
            visible={isCountryPickerVisible} // Show the CountryPicker only when the modal is open
            containerButtonStyle={styles.countryPickerButton}
            countryContainerStyle={styles.countryContainer} // Style for each country row
            countryNameStyle={styles.countryName} // Style for country name
            callingCodeStyle={styles.callingCode} // Style for calling code
            flagStyle={styles.flag} // Style for the flag
          />
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setCountryPickerVisible(false)} // Close the modal
          >
            <Icon name="close" size={wp('5%')} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    marginBottom: hp('2%'),
  },
  countryPickerContainer: {
    backgroundColor: colors.white,
    borderRadius: wp('2%'),
    padding: wp('2%'),
  },
  inputWrapper: {
    flex: 1,
    marginLeft: wp('2%'),
    backgroundColor: 'transparent',
    borderRadius: wp('2%'),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: wp('4%'),
    color: colors.primary,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
  countryPickerButton: {
    backgroundColor: 'transparent',
  },
  countryContainer: {
    padding: wp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  countryName: {
    fontSize: wp('4%'),
    color: colors.primary,
  },
  callingCode: {
    fontSize: wp('10%'), // Adjust the calling code font size for tablets
    color: colors.secondary,
  },
  flag: {
    width: wp('10%'), // Adjust the flag width for tablets
    height: wp('7%'), // Adjust the flag height for tablets
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: wp('2%'),
    padding: wp('2%'),
    alignItems: 'center',
  },
  closeModalButton: {
    position: 'absolute',
    top: hp('1%'),
    right: wp('1%'),
  },
});

export default PhoneNumberInput;
