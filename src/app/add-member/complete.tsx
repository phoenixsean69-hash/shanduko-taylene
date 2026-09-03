import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAddMember } from "./_layout";

export default function CompleteScreen(){
  const { reset } = useAddMember();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.stepHeader}>6 of 6</Text>
        <Text style={styles.title}>Submission Complete</Text>
        <Text style={styles.subtitle}>The member record has been staged for review.</Text>

        <Pressable style={styles.button} onPress={() => { reset(); router.replace('/(tabs)'); }}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{ flex:1, backgroundColor:'#F4F7F5' },
  container:{ padding:20, paddingTop:60, alignItems:'center' },
  stepHeader:{ color:'#7B8C87', marginBottom:6 },
  title:{ fontSize:24, fontWeight:'700', color:'#203A35', marginBottom:8 },
  subtitle:{ color:'#7B8C87', marginBottom:20 },
  button:{ backgroundColor:'#175744', paddingHorizontal:20, paddingVertical:12, borderRadius:10 },
  buttonText:{ color:'#fff', fontWeight:'700' }
});
