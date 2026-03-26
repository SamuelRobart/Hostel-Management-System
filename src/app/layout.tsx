import './globals.css'

export const metadata = {
  title: 'Hostel Management System',
  description: 'Government Hostel Management System for Coimbatore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}