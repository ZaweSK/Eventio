import TabBarIcon from "@/components/TabBarIcon";

export const ProfileTabOptions = {
    title: 'Profiless',
    headerStyle: {
      shadowOpacity: 0,
    },
    tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="code" color={color} />,
    headerRight: () => {},
}