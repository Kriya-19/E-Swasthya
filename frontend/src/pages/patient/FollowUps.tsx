// import { useState, useEffect } from 'react';
// import {
//   Clock,
//   Pill,
//   Calendar as CalendarIcon,
//   CheckCircle,
//   AlertCircle,
//   User,
//   Check,
//   X,
// } from 'lucide-react';
// import T from '@/components/T';

// import PatientLayout from '@/components/layouts/PatientLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { mockMedicines, mockDoctor } from '@/data/mockData';
// import { cn } from '@/lib/utils';
// import { getPatientAppointments, rescheduleAppointment, createDemoData } from '@/services/appointment.service';
// import type { Appointment } from '@/types/appointment';
// import { useToast } from '@/hooks/use-toast';

// const FollowUps = () => {
//   const { toast } = useToast();
//   const instructions = [
//     'Take medications as prescribed',
//     'Monitor blood pressure daily',
//     'Maintain a low-salt diet',
//     'Get at least 30 minutes of light exercise',
//     'Avoid stress and get adequate sleep',
//   ];

//   // 🔹 Medicine state
//   const [medicines, setMedicines] = useState(
//     mockMedicines.map((med) => ({
//       ...med,
//       status: 'pending' as 'pending' | 'taken' | 'skipped',
//     }))
//   );

//   // 🔹 Appointment state
//   const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [rescheduling, setRescheduling] = useState(false);

//   // Store demo patient/doctor IDs
//   const [demoPatientId, setDemoPatientId] = useState<string | null>(null);
//   const [demoDoctorId, setDemoDoctorId] = useState<string | null>(null);

//   useEffect(() => {
//     const initializeDemoData = async () => {
//       try {
//         setLoading(true);
        
//         // First, create demo data (patient, doctor, appointment)
//         const demoData = await createDemoData();
//         setDemoPatientId(demoData.patient.id);
//         setDemoDoctorId(demoData.doctor.id);
        
//         // Then fetch appointments for the demo patient
//         const appointments = await getPatientAppointments(demoData.patient.id);
//         const upcoming = appointments.length > 0 ? appointments[0] : null;
        
//         if (upcoming) {
//           setUpcomingAppointment(upcoming);
//         } else {
//           // If no appointment found, use the one from demo data
//           setUpcomingAppointment(demoData.appointment);
//         }
//       } catch (err: any) {
//         console.error('Failed to initialize demo data:', err);
//         toast({
//           title: 'Error',
//           description: 'Failed to load demo data. Please check backend connection.',
//           variant: 'destructive',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeDemoData();
//   }, [toast]);

//   // 🔹 Follow-up date state - initialize from appointment if available
//   const [followUpDate, setFollowUpDate] = useState<Date>(() => {
//     if (upcomingAppointment) {
//       const [year, month, day] = upcomingAppointment.date.split('-').map(Number);
//       const [hours, minutes] = upcomingAppointment.time.split(':').map(Number);
//       return new Date(year, month - 1, day, hours, minutes);
//     }
//     return new Date('2025-01-30T10:00:00');
//   });

//   // Update followUpDate when appointment is loaded
//   useEffect(() => {
//     if (upcomingAppointment) {
//       const [year, month, day] = upcomingAppointment.date.split('-').map(Number);
//       const timeStr = upcomingAppointment.time;
//       // Handle both 24-hour and 12-hour formats
//       let hours = 10;
//       let minutes = 0;
//       if (timeStr.includes('AM') || timeStr.includes('PM')) {
//         const [timePart, period] = timeStr.split(' ');
//         const [h, m] = timePart.split(':').map(Number);
//         hours = period === 'PM' && h !== 12 ? h + 12 : h === 12 && period === 'AM' ? 0 : h;
//         minutes = m;
//       } else {
//         [hours, minutes] = timeStr.split(':').map(Number);
//       }
//       setFollowUpDate(new Date(year, month - 1, day, hours, minutes));
//     }
//   }, [upcomingAppointment]);

//   const updateMedicineStatus = (
//     index: number,
//     status: 'taken' | 'skipped'
//   ) => {
//     setMedicines((prev) =>
//       prev.map((med, i) =>
//         i === index ? { ...med, status } : med
//       )
//     );
//   };

//   const handleReschedule = async () => {
//     if (!upcomingAppointment) {
//       toast({
//         title: 'Error',
//         description: 'No appointment found. Please refresh the page.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     try {
//       setRescheduling(true);
      
//       // Format date as YYYY-MM-DD
//       const year = followUpDate.getFullYear();
//       const month = String(followUpDate.getMonth() + 1).padStart(2, '0');
//       const day = String(followUpDate.getDate()).padStart(2, '0');
//       const dateStr = `${year}-${month}-${day}`;

//       // Format time as HH:MM (24-hour format)
//       const hours = String(followUpDate.getHours()).padStart(2, '0');
//       const minutes = String(followUpDate.getMinutes()).padStart(2, '0');
//       const timeStr = `${hours}:${minutes}`;

//       // Reschedule appointment via API (always use real backend)
//       const updatedAppointment = await rescheduleAppointment(
//         upcomingAppointment.id,
//         dateStr,
//         timeStr
//       );

//       setUpcomingAppointment(updatedAppointment);
      
//       toast({
//         title: 'Success',
//         description: `Appointment rescheduled to ${dateStr} at ${timeStr}. Doctor calendar will be updated.`,
//       });
//     } catch (err: any) {
//       console.error('Failed to reschedule appointment:', err);
//       const errorMessage = err.response?.data?.error || err.message || 'Failed to reschedule appointment';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setRescheduling(false);
//     }
//   };

//   return (
//     <PatientLayout>
//       <Breadcrumbs />

//       <div
//         className="
//           bg-primary/30
//           m-4 md:m-6 lg:m-10
//           p-6 md:p-8 lg:p-10
//           rounded-[2.5rem]
//           min-h-[calc(100%-4rem)]
//         "
//       >
//         <div>
//           <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
//             <T>Follow-ups &amp; Medication</T>
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             <T>Track your medications and follow doctor's instructions</T>
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6 mt-6">
//           {/* LEFT SECTION */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Doctor Instructions */}
//             <div className="bg-card rounded-xl shadow-card border p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
//                   <User className="h-6 w-6 text-secondary" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-secondary">
//                     {mockDoctor.name}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     {mockDoctor.specialization}
//                   </p>
//                 </div>
//               </div>

//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Doctor's Instructions</T>
//               </h3>

//               <div className="space-y-3">
//                 {instructions.map((instruction, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
//                   >
//                     <CheckCircle className="h-5 w-5 text-success mt-0.5" />
//                     <span className="text-muted-foreground">
//                       {instruction}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Medicines */}
//             <div className="bg-card rounded-xl shadow-card border p-6">
//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Prescribed Medicines</T>
//               </h3>

//               <div className="space-y-4">
//                 {medicines.map((medicine, index) => (
//                   <div
//                     key={index}
//                     className={cn(
//                       'flex items-center justify-between p-4 rounded-xl transition-colors',
//                       medicine.status === 'taken' && 'bg-success/10',
//                       medicine.status === 'skipped' && 'bg-destructive/10',
//                       medicine.status === 'pending' && 'bg-muted/50'
//                     )}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
//                         <Pill className="h-5 w-5 text-secondary" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-secondary">
//                           {medicine.name} {medicine.dosage}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {medicine.frequency} •{' '}
//                           {medicine.timing.replace('-', ' ')}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       {medicine.status === 'taken' ? (
//                         <Button size="sm" variant="success" disabled>
//                           <Check className="h-4 w-4 mr-1" />
//                           Taken
//                         </Button>
//                       ) : medicine.status === 'skipped' ? (
//                         <Button size="sm" variant="outline" disabled>
//                           <X className="h-4 w-4 mr-1" />
//                           Skipped
//                         </Button>
//                       ) : (
//                         <>
//                           <Button
//                             size="sm"
//                             variant="success"
//                             onClick={() =>
//                               updateMedicineStatus(index, 'taken')
//                             }
//                           >
//                             <Check className="h-4 w-4 mr-1" />
//                             Taken
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() =>
//                               updateMedicineStatus(index, 'skipped')
//                             }
//                           >
//                             <X className="h-4 w-4 mr-1" />
//                             Skip
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="space-y-6">
//             {/* Follow-up */}
//             <div className="bg-card rounded-xl shadow-card border p-6">
//               <h3 className="font-semibold text-secondary mb-4">
//                 Next Follow-up
//               </h3>

//               {loading ? (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <p className="text-muted-foreground">Loading appointment...</p>
//                 </div>
//               ) : upcomingAppointment ? (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <CalendarIcon className="h-12 w-12 text-secondary mx-auto mb-3" />
//                   <p className="font-display text-2xl font-bold text-secondary">
//                     {followUpDate.toLocaleDateString('en-IN', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric',
//                     })}
//                   </p>
//                   <p className="text-muted-foreground mt-1">
//                     {followUpDate.toLocaleTimeString([], {
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-3">
//                     with {mockDoctor.name}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <p className="text-muted-foreground">No upcoming appointments</p>
//                 </div>
//               )}

//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button className="w-full mt-4" variant="outline" disabled={loading}>
//                     <Clock className="h-4 w-4 mr-2" />
//                     {loading ? 'Loading...' : upcomingAppointment ? 'Reschedule' : 'Schedule Appointment'}
//                   </Button>
//                 </PopoverTrigger>

//                 <PopoverContent className="w-auto p-0" align="center">
//                   <div className="p-4 space-y-4">
//                     <Calendar
//                       mode="single"
//                       selected={followUpDate}
//                       onSelect={(date) => {
//                         if (date) {
//                           // Preserve the time when changing date
//                           const newDate = new Date(date);
//                           newDate.setHours(followUpDate.getHours(), followUpDate.getMinutes());
//                           setFollowUpDate(newDate);
//                         }
//                       }}
//                       disabled={(date) => {
//                         const today = new Date();
//                         today.setHours(0, 0, 0, 0);
//                         return date < today;
//                       }}
//                       initialFocus
//                     />
//                     <div className="flex gap-2">
//                       <label className="text-sm text-secondary/70 self-center">Time:</label>
//                       <input
//                         type="time"
//                         value={`${String(followUpDate.getHours()).padStart(2, '0')}:${String(followUpDate.getMinutes()).padStart(2, '0')}`}
//                         onChange={(e) => {
//                           const [hours, minutes] = e.target.value.split(':').map(Number);
//                           const newDate = new Date(followUpDate);
//                           newDate.setHours(hours, minutes);
//                           setFollowUpDate(newDate);
//                         }}
//                         className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                       />
//                     </div>
//                     <Button 
//                       className="w-full" 
//                       onClick={handleReschedule}
//                       disabled={rescheduling || !upcomingAppointment}
//                     >
//                       {rescheduling ? 'Rescheduling...' : 'Confirm Reschedule'}
//                     </Button>
//                     {upcomingAppointment?.id.startsWith('mock-') && (
//                       <p className="text-xs text-muted-foreground text-center px-2">
//                         ℹ️ Using mock appointment for testing. Changes are saved locally only.
//                       </p>
//                     )}
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             </div>

//             {/* Reminder */}
//             <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
//                 <div>
//                   <p className="font-medium text-secondary text-sm">
//                     Reminder
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Don't forget to take your blood pressure readings
//                     before the follow-up visit.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PatientLayout>
//   );
// };

// export default FollowUps;











// import { useState, useEffect } from 'react';
// import {
//   Clock,
//   Pill,
//   Calendar as CalendarIcon,
//   CheckCircle,
//   AlertCircle,
//   User,
//   Check,
//   X,
// } from 'lucide-react';
// import T from '@/components/T';

// import PatientLayout from '@/components/layouts/PatientLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { jwtDecode } from "jwt-decode";
// import { getPatientFollowUp } from '@/services/followUp.service';

// interface JwtPayload {
//   id: string;
//   role: string;
// }

// const FollowUps = () => {
//   /* ---------------- Doctor instructions (unchanged) ---------------- */
//   const instructions = [
//     'Take medications as prescribed',
//     'Monitor blood pressure daily',
//     'Maintain a low-salt diet',
//     'Get at least 30 minutes of light exercise',
//     'Avoid stress and get adequate sleep',
//   ];

//   /* ---------------- Medicines (unchanged – still mock) ---------------- */
//   const [medicines, setMedicines] = useState([
//     {
//       name: 'Amlodipine',
//       dosage: '5mg',
//       frequency: 'Once daily',
//       timing: 'morning',
//       status: 'pending' as 'pending' | 'taken' | 'skipped',
//     },
//     {
//       name: 'Metformin',
//       dosage: '500mg',
//       frequency: 'Twice daily',
//       timing: 'after-meals',
//       status: 'pending' as 'pending' | 'taken' | 'skipped',
//     },
//   ]);

//   /* ---------------- REAL FOLLOW-UP (backend) ---------------- */
//   const [followUp, setFollowUp] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadFollowUp = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded = jwtDecode<JwtPayload>(token);
//         const data = await getPatientFollowUp(decoded.id);
//         setFollowUp(data); // can be null
//       } catch (err) {
//         console.error('Failed to load follow-up:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFollowUp();
//   }, []);

//   const updateMedicineStatus = (
//     index: number,
//     status: 'taken' | 'skipped'
//   ) => {
//     setMedicines((prev) =>
//       prev.map((med, i) =>
//         i === index ? { ...med, status } : med
//       )
//     );
//   };

//   return (
//     <PatientLayout>
//       <Breadcrumbs />

//       <div className="bg-primary/30 m-4 md:m-6 lg:m-10 p-6 md:p-8 lg:p-10 rounded-[2.5rem]">
//         <div>
//           <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
//             <T>Follow-ups & Medication</T>
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             <T>Track your medications and upcoming follow-ups</T>
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6 mt-6">
//           {/* ================= LEFT ================= */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Doctor Instructions */}
//             <div className="bg-card rounded-xl shadow border p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
//                   <User className="h-6 w-6 text-secondary" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-secondary">
//                     <T>Your Doctor</T>
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     <T>General Physician</T>
//                   </p>
//                 </div>
//               </div>

//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Doctor's Instructions</T>
//               </h3>

//               <div className="space-y-3">
//                 {instructions.map((instruction, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
//                   >
//                     <CheckCircle className="h-5 w-5 text-success mt-0.5" />
//                     <span className="text-muted-foreground">
//                       {instruction}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Medicines */}
//             <div className="bg-card rounded-xl shadow border p-6">
//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Prescribed Medicines</T>
//               </h3>

//               <div className="space-y-4">
//                 {medicines.map((medicine, index) => (
//                   <div
//                     key={index}
//                     className={cn(
//                       'flex items-center justify-between p-4 rounded-xl',
//                       medicine.status === 'taken' && 'bg-success/10',
//                       medicine.status === 'skipped' && 'bg-destructive/10',
//                       medicine.status === 'pending' && 'bg-muted/50'
//                     )}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
//                         <Pill className="h-5 w-5 text-secondary" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-secondary">
//                           {medicine.name} {medicine.dosage}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {medicine.frequency} • {medicine.timing}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       {medicine.status === 'pending' ? (
//                         <>
//                           <Button
//                             size="sm"
//                             variant="success"
//                             onClick={() =>
//                               updateMedicineStatus(index, 'taken')
//                             }
//                           >
//                             <Check className="h-4 w-4 mr-1" />
//                             <T>Taken</T>
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() =>
//                               updateMedicineStatus(index, 'skipped')
//                             }
//                           >
//                             <X className="h-4 w-4 mr-1" />
//                             <T>Skip</T>
//                           </Button>
//                         </>
//                       ) : (
//                         <Button size="sm" disabled>
//                           <T>{medicine.status}</T>
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ================= RIGHT ================= */}
//           <div className="space-y-6">
//             {/* Follow-up */}
//             <div className="bg-card rounded-xl shadow border p-6">
//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Next Follow-up</T>
//               </h3>

//               {loading ? (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <T>Loading follow-up...</T>
//                 </div>
//               ) : followUp ? (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-secondary" />
//                   <p className="font-display text-2xl font-bold text-secondary">
//                     {new Date(followUp.followUpDate).toDateString()}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-2">
//                     <T>Doctor:</T> {followUp.doctor.name}
//                   </p>
//                   {followUp.reason && (
//                     <p className="text-sm mt-1 text-muted-foreground">
//                       {followUp.reason}
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <T>No upcoming follow-ups</T>
//                 </div>
//               )}
//             </div>

//             {/* Reminder */}
//             <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
//                 <div>
//                   <p className="font-medium text-secondary text-sm">
//                     <T>Reminder</T>
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     <T>
//                       Don’t forget to follow your doctor’s advice before the
//                       follow-up visit.
//                     </T>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PatientLayout>
//   );
// };

// export default FollowUps;















// import { useState, useEffect } from 'react';
// import {
//   Clock,
//   Pill,
//   Calendar as CalendarIcon,
//   CheckCircle,
//   AlertCircle,
//   User,
//   Check,
//   X,
// } from 'lucide-react';
// import T from '@/components/T';

// import PatientLayout from '@/components/layouts/PatientLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { getPatientFollowUp } from '@/services/followUp.service';

// const FollowUps = () => {
//   /* ---------------- Doctor instructions ---------------- */
//   const instructions = [
//     'Take medications as prescribed',
//     'Monitor blood pressure daily',
//     'Maintain a low-salt diet',
//     'Get at least 30 minutes of light exercise',
//     'Avoid stress and get adequate sleep',
//   ];

//   /* ---------------- Medicines (still mock) ---------------- */
//   const [medicines, setMedicines] = useState([
//     {
//       name: 'Amlodipine',
//       dosage: '5mg',
//       frequency: 'Once daily',
//       timing: 'morning',
//       status: 'pending' as 'pending' | 'taken' | 'skipped',
//     },
//     {
//       name: 'Metformin',
//       dosage: '500mg',
//       frequency: 'Twice daily',
//       timing: 'after-meals',
//       status: 'pending' as 'pending' | 'taken' | 'skipped',
//     },
//   ]);

//   /* ---------------- REAL FOLLOW-UP (backend) ---------------- */
//   const [followUp, setFollowUp] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadFollowUp = async () => {
//       try {
//         const data = await getPatientFollowUp(); // 👈 NO ID
//         setFollowUp(data); // can be null
//       } catch (err) {
//         console.error('Failed to load follow-up:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFollowUp();
//   }, []);

//   const updateMedicineStatus = (
//     index: number,
//     status: 'taken' | 'skipped'
//   ) => {
//     setMedicines((prev) =>
//       prev.map((med, i) =>
//         i === index ? { ...med, status } : med
//       )
//     );
//   };

//   return (
//     <PatientLayout>
//       <Breadcrumbs />

//       <div className="bg-primary/30 m-4 md:m-6 lg:m-10 p-6 md:p-8 lg:p-10 rounded-[2.5rem]">
//         <div>
//           <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
//             <T>Follow-ups & Medication</T>
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             <T>Track your medications and upcoming follow-ups</T>
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6 mt-6">
//           {/* ================= LEFT ================= */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Doctor Instructions */}
//             <div className="bg-card rounded-xl shadow border p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
//                   <User className="h-6 w-6 text-secondary" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-secondary">
//                     <T>Your Doctor</T>
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     <T>General Physician</T>
//                   </p>
//                 </div>
//               </div>

//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Doctor's Instructions</T>
//               </h3>

//               <div className="space-y-3">
//                 {instructions.map((instruction, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
//                   >
//                     <CheckCircle className="h-5 w-5 text-success mt-0.5" />
//                     <span className="text-muted-foreground">
//                       {instruction}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Medicines */}
//             <div className="bg-card rounded-xl shadow border p-6">
//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Prescribed Medicines</T>
//               </h3>

//               <div className="space-y-4">
//                 {medicines.map((medicine, index) => (
//                   <div
//                     key={index}
//                     className={cn(
//                       'flex items-center justify-between p-4 rounded-xl',
//                       medicine.status === 'taken' && 'bg-success/10',
//                       medicine.status === 'skipped' && 'bg-destructive/10',
//                       medicine.status === 'pending' && 'bg-muted/50'
//                     )}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
//                         <Pill className="h-5 w-5 text-secondary" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-secondary">
//                           {medicine.name} {medicine.dosage}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {medicine.frequency} • {medicine.timing}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       {medicine.status === 'pending' ? (
//                         <>
//                           <Button
//                             size="sm"
//                             variant="success"
//                             onClick={() => updateMedicineStatus(index, 'taken')}
//                           >
//                             <Check className="h-4 w-4 mr-1" />
//                             <T>Taken</T>
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => updateMedicineStatus(index, 'skipped')}
//                           >
//                             <X className="h-4 w-4 mr-1" />
//                             <T>Skip</T>
//                           </Button>
//                         </>
//                       ) : (
//                         <Button size="sm" disabled>
//                           <T>{medicine.status}</T>
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ================= RIGHT ================= */}
//           <div className="space-y-6">
//             <div className="bg-card rounded-xl shadow border p-6">
//               <h3 className="font-semibold text-secondary mb-4">
//                 <T>Next Follow-up</T>
//               </h3>

//               {loading ? (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <T>Loading follow-up...</T>
//                 </div>
//               ) : followUp ? (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-secondary" />
//                   <p className="font-display text-2xl font-bold text-secondary">
//                     {new Date(followUp.followUpDate).toDateString()}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-2">
//                     <T>Doctor:</T> {followUp.doctor?.name}
//                   </p>
//                   {followUp.reason && (
//                     <p className="text-sm mt-1 text-muted-foreground">
//                       {followUp.reason}
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center p-6 bg-primary/30 rounded-xl">
//                   <T>No upcoming follow-ups</T>
//                 </div>
//               )}
//             </div>

//             <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
//                 <div>
//                   <p className="font-medium text-secondary text-sm">
//                     <T>Reminder</T>
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     <T>
//                       Don’t forget to follow your doctor’s advice before the
//                       follow-up visit.
//                     </T>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PatientLayout>
//   );
// };

// export default FollowUps;




































import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Clock,
  Pill,
  Calendar as CalendarIcon,
  CheckCircle,
  AlertCircle,
  User,
  Check,
  X,
} from 'lucide-react';
import T from '@/components/T';

import PatientLayout from '@/components/layouts/PatientLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getPatientFollowUp } from '@/services/followUp.service';

const FollowUps = () => {
  /* ---------------- Doctor instructions ---------------- */
  const instructions = [
    'Take medications as prescribed',
    'Monitor blood pressure daily',
    'Maintain a low-salt diet',
    'Get at least 30 minutes of light exercise',
    'Avoid stress and get adequate sleep',
  ];

  /* ---------------- Medicines (still mock) ---------------- */
  const [medicines, setMedicines] = useState([
    {
      name: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      timing: 'morning',
      status: 'pending' as 'pending' | 'taken' | 'skipped',
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      timing: 'after-meals',
      status: 'pending' as 'pending' | 'taken' | 'skipped',
    },
  ]);

  /* ---------------- REAL FOLLOW-UP ---------------- */
  const [followUp, setFollowUp] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  /* 🔥 NEW (reschedule) */
  const [newDate, setNewDate] = useState('');
  const [rescheduling, setRescheduling] = useState(false);

  useEffect(() => {
    const loadFollowUp = async () => {
      try {
        const data = await getPatientFollowUp();
        setFollowUp(data);
      } catch (err) {
        console.error('Failed to load follow-up:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFollowUp();
  }, []);

  const updateMedicineStatus = (
    index: number,
    status: 'taken' | 'skipped'
  ) => {
    setMedicines((prev) =>
      prev.map((med, i) =>
        i === index ? { ...med, status } : med
      )
    );
  };

  /* 🔥 RESCHEDULE FOLLOW-UP */
  const handleReschedule = async () => {
    if (!newDate || !followUp?._id) return;

    try {
      setRescheduling(true);
      const token = localStorage.getItem('token');

      const res = await axios.put(
        `http://localhost:5001/api/follow-ups/${followUp._id}`,
        { followUpDate: newDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFollowUp(res.data.data); // auto update UI
      setNewDate('');
    } catch {
      alert('Failed to reschedule follow-up');
    } finally {
      setRescheduling(false);
    }
  };

  return (
    <PatientLayout>
      <Breadcrumbs />

      <div className="bg-primary/30 m-4 md:m-6 lg:m-10 p-6 md:p-8 lg:p-10 rounded-[2.5rem]">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
            <T>Follow-ups & Medication</T>
          </h1>
          <p className="text-muted-foreground mt-1">
            <T>Track your medications and upcoming follow-ups</T>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Instructions */}
            <div className="bg-card rounded-xl shadow border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-secondary">
                    <T>Your Doctor</T>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <T>General Physician</T>
                  </p>
                </div>
              </div>

              <h3 className="font-semibold text-secondary mb-4">
                <T>Doctor's Instructions</T>
              </h3>

              <div className="space-y-3">
                {instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <span className="text-muted-foreground">
                      {instruction}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medicines */}
            <div className="bg-card rounded-xl shadow border p-6">
              <h3 className="font-semibold text-secondary mb-4">
                <T>Prescribed Medicines</T>
              </h3>

              <div className="space-y-4">
                {medicines.map((medicine, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-xl',
                      medicine.status === 'taken' && 'bg-success/10',
                      medicine.status === 'skipped' && 'bg-destructive/10',
                      medicine.status === 'pending' && 'bg-muted/50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <Pill className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">
                          {medicine.name} {medicine.dosage}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {medicine.frequency} • {medicine.timing}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {medicine.status === 'pending' ? (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => updateMedicineStatus(index, 'taken')}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            <T>Taken</T>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateMedicineStatus(index, 'skipped')}
                          >
                            <X className="h-4 w-4 mr-1" />
                            <T>Skip</T>
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" disabled>
                          <T>{medicine.status}</T>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow border p-6">
              <h3 className="font-semibold text-secondary mb-4">
                <T>Next Follow-up</T>
              </h3>

              {loading ? (
                <div className="text-center p-6 bg-primary/30 rounded-xl">
                  <T>Loading follow-up...</T>
                </div>
              ) : followUp ? (
                <div className="text-center p-6 bg-primary/30 rounded-xl">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-secondary" />
                  <p className="font-display text-2xl font-bold text-secondary">
                    {new Date(followUp.followUpDate).toDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <T>Doctor:</T> {followUp.doctor?.name}
                  </p>
                  {followUp.reason && (
                    <p className="text-sm mt-1 text-muted-foreground">
                      {followUp.reason}
                    </p>
                  )}

                  {/* 🔥 RESCHEDULE UI */}
                  <div className="mt-4 space-y-2">
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full border rounded-md p-2 text-sm"
                    />

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={handleReschedule}
                      disabled={rescheduling || !newDate}
                    >
                      {rescheduling ? (
                        <T>Rescheduling...</T>
                      ) : (
                        <T>Reschedule Follow-up</T>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 bg-primary/30 rounded-xl">
                  <T>No upcoming follow-ups</T>
                </div>
              )}
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-secondary text-sm">
                    <T>Reminder</T>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <T>
                      Don’t forget to follow your doctor’s advice before the
                      follow-up visit.
                    </T>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default FollowUps;
