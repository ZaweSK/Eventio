import TabBarIcon from "@/src/components/TabBarIcon";

export const ProfileTabOptions = {
    title: 'Profiless',
    headerStyle: {
      shadowOpacity: 0,
    },
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => <TabBarIcon image={require('@/assets/images/tabIcon_profile.png')} color={color} size={focused ? 35 : 30}/>,
    headerRight: () => {},
}