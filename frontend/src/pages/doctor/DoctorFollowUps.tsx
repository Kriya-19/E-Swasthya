// import { Clock, User, Calendar, Bell } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';

// const followUps = [
//   { id: '1', patient: ' kriya mehta', date: 'Jan 30, 2025', reason: 'Blood pressure review', reminder: true },
//   { id: '2', patient: 'Priya Sharma', date: 'Feb 5, 2025', reason: 'Diabetes follow-up', reminder: true },
//   { id: '3', patient: 'Amit Patel', date: 'Feb 10, 2025', reason: 'Post-surgery check', reminder: false },
// ];

// const DoctorFollowUps = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="font-display text-2xl font-bold text-secondary">Follow-up Management</h1>
//           <Button><Clock className="h-4 w-4 mr-2" />Schedule Follow-up</Button>
//         </div>

//         <div className="bg-card rounded-xl shadow-card border overflow-hidden">
//           <div className="divide-y">
//             {followUps.map((followUp) => (
//               <div key={followUp.id} className="p-6 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
//                     <User className="h-6 w-6 text-secondary" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-secondary">{followUp.patient}</p>
//                     <p className="text-sm text-muted-foreground">{followUp.reason}</p>
//                     <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
//                       <Calendar className="h-3 w-3" />
//                       {followUp.date}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <Bell className="h-4 w-4 text-muted-foreground" />
//                     <Switch checked={followUp.reminder} />
//                   </div>
//                   <Button variant="outline" size="sm">Reschedule</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorFollowUps;
















// import { Clock, User, Calendar, Bell } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';

// const followUps = [
//   { id: '1', patient: ' kriya mehta', date: 'Jan 30, 2025', reason: 'Blood pressure review', reminder: true },
//   { id: '2', patient: 'Priya Sharma', date: 'Feb 5, 2025', reason: 'Diabetes follow-up', reminder: true },
//   { id: '3', patient: 'Amit Patel', date: 'Feb 10, 2025', reason: 'Post-surgery check', reminder: false },
// ];

// const DoctorFollowUps = () => {
//   return (
//     <DoctorLayout>
//       {/* Light Teal Background Container with white padding on all sides */}
//       <div className="bg-primary/30 m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-3xl min-h-[calc(100%-4rem)]">
//         <Breadcrumbs />

//         <div className="space-y-6">
//           {/* Header Section */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-secondary/10">
//             <div>
//               <h1 className="font-display text-3xl lg:text-4xl font-bold text-secondary tracking-tight">
//                 Follow-up Management
//               </h1>
//               <p className="text-secondary/60 mt-1 flex items-center gap-2">
//                 <Clock className="h-4 w-4" />
//                 Track and schedule patient follow-ups
//               </p>
//             </div>
//             <Button variant="hero" size="lg">
//               <Clock className="h-5 w-5" />
//               Schedule Follow-up
//             </Button>
//           </div>

//           {/* Follow-ups List */}
//           <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden">
//             <div className="divide-y divide-secondary/10">
//               {followUps.map((followUp) => (
//                 <div 
//                   key={followUp.id} 
//                   className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-primary/10 transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0">
//                       <User className="h-6 w-6 text-secondary" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-secondary text-base">{followUp.patient}</p>
//                       <p className="text-sm text-secondary/70 mt-0.5">{followUp.reason}</p>
//                       <div className="flex items-center gap-2 mt-1.5 text-sm text-secondary/60">
//                         <Calendar className="h-3.5 w-3.5" />
//                         {followUp.date}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 sm:ml-auto">
//                     <div className="flex items-center gap-2">
//                       <Bell className="h-4 w-4 text-secondary/60" />
//                       <Switch checked={followUp.reminder} />
//                     </div>
//                     <Button variant="outline" size="sm" className="hover:bg-primary/30">
//                       Reschedule
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Stats Summary */}
//           <div className="grid sm:grid-cols-3 gap-4">
//             <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
//               <p className="text-sm text-secondary/60 mb-2">Upcoming This Week</p>
//               <p className="text-3xl font-bold text-secondary">3</p>
//             </div>
//             <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
//               <p className="text-sm text-secondary/60 mb-2">Reminders Set</p>
//               <p className="text-3xl font-bold text-secondary">2</p>
//             </div>
//             <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
//               <p className="text-sm text-secondary/60 mb-2">Completed This Month</p>
//               <p className="text-3xl font-bold text-secondary">12</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorFollowUps;

// import { Clock, User, Calendar, Bell } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';

// const followUps = [
//   { id: '1', patient: ' kriya mehta', date: 'Jan 30, 2025', reason: 'Blood pressure review', reminder: true },
//   { id: '2', patient: 'Priya Sharma', date: 'Feb 5, 2025', reason: 'Diabetes follow-up', reminder: true },
//   { id: '3', patient: 'Amit Patel', date: 'Feb 10, 2025', reason: 'Post-surgery check', reminder: false },
// ];

// const DoctorFollowUps = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="font-display text-2xl font-bold text-secondary">Follow-up Management</h1>
//           <Button><Clock className="h-4 w-4 mr-2" />Schedule Follow-up</Button>
//         </div>

//         <div className="bg-card rounded-xl shadow-card border overflow-hidden">
//           <div className="divide-y">
//             {followUps.map((followUp) => (
//               <div key={followUp.id} className="p-6 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
//                     <User className="h-6 w-6 text-secondary" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-secondary">{followUp.patient}</p>
//                     <p className="text-sm text-muted-foreground">{followUp.reason}</p>
//                     <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
//                       <Calendar className="h-3 w-3" />
//                       {followUp.date}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <Bell className="h-4 w-4 text-muted-foreground" />
//                     <Switch checked={followUp.reminder} />
//                   </div>
//                   <Button variant="outline" size="sm">Reschedule</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorFollowUps;


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Clock,
//   User,
//   Calendar,
//   Bell,
//   Plus
// } from "lucide-react";

// import DoctorLayout from "@/components/layouts/DoctorLayout";
// import Breadcrumbs from "@/components/shared/Breadcrumbs";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Input } from "@/components/ui/input";
// import T from "@/components/T";

// interface FollowUp {
//   _id: string;
//   patient: {
//     _id: string;
//     name: string;
//   };
//   followUpDate: string;
//   reason: string;
// }

// const DoctorFollowUps = () => {
//   const [followUps, setFollowUps] = useState<FollowUp[]>([]);
//   const [prescriptions, setPrescriptions] = useState<any[]>([]);
//   const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
//   const [daysFromToday, setDaysFromToday] = useState<number>(7);
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   /* =============================
//      FETCH DOCTOR PRESCRIPTIONS
//      (source of patientId)
//   ============================== */
//   useEffect(() => {
//     if (!token) return;

//     axios
//       .get("http://localhost:5001/api/prescriptions/doctor/me", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(res => setPrescriptions(res.data))
//       .catch(err => console.error(err));
//   }, [token]);

//   /* =============================
//      FETCH FOLLOW-UPS
//   ============================== */
//   useEffect(() => {
//     if (!token) return;

//     axios
//       .get("http://localhost:5001/api/follow-ups/doctor/me", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(res => setFollowUps(res.data?.data || []))
//       .catch(() => {});
//   }, [token]);

//   /* =============================
//      CREATE FOLLOW-UP
//   ============================== */
//   const handleCreateFollowUp = async () => {
//     if (!selectedPatientId) {
//       alert("Please select a patient");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:5001/api/follow-ups",
//         {
//           patientId: selectedPatientId,
//           daysFromToday,
//           reason
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Follow-up scheduled successfully");

//       setReason("");
//       setSelectedPatientId(null);

//     } catch (err: any) {
//       alert(err.response?.data?.message || "Failed to create follow-up");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DoctorLayout>
//       <div className="bg-primary/30 m-6 p-6 rounded-3xl">
//         <Breadcrumbs />

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">
//               <T>Follow-up Management</T>
//             </h1>
//             <p className="text-sm text-secondary/60 flex items-center gap-2">
//               <Clock className="h-4 w-4" />
//               <T>Schedule and track patient follow-ups</T>
//             </p>
//           </div>
//         </div>

//         {/* CREATE FOLLOW-UP */}
//         <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">
//           <h2 className="font-semibold">
//             <T>Schedule New Follow-up</T>
//           </h2>

//           {/* PATIENT SELECT */}
//           <select
//             className="w-full border rounded p-2"
//             value={selectedPatientId || ""}
//             onChange={(e) => setSelectedPatientId(e.target.value)}
//           >
//             <option value="">Select Patient</option>
//             {prescriptions.map(p => (
//               <option key={p._id} value={p.patient._id}>
//                 {p.patient.name}
//               </option>
//             ))}
//           </select>

//           <Input
//             type="number"
//             placeholder="Days from today"
//             value={daysFromToday}
//             onChange={(e) => setDaysFromToday(Number(e.target.value))}
//           />

//           <Input
//             placeholder="Reason (optional)"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//           />

//           <Button
//             onClick={handleCreateFollowUp}
//             disabled={loading}
//             className="w-full"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             {loading ? "Scheduling..." : "Schedule Follow-up"}
//           </Button>
//         </div>

//         {/* FOLLOW-UP LIST */}
//         <div className="bg-white rounded-xl shadow divide-y">
//           {followUps.length === 0 && (
//             <p className="p-4 text-center text-muted-foreground">
//               No upcoming follow-ups
//             </p>
//           )}

//           {followUps.map(fu => (
//             <div key={fu._id} className="p-4 flex justify-between">
//               <div>
//                 <p className="font-semibold">{fu.patient.name}</p>
//                 <p className="text-sm text-gray-500">{fu.reason || "—"}</p>
//                 <p className="text-xs mt-1 flex items-center gap-1">
//                   <Calendar className="h-3 w-3" />
//                   {new Date(fu.followUpDate).toDateString()}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Bell className="h-4 w-4 text-secondary/60" />
//                 <Switch checked />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorFollowUps;


















import { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  Calendar,
  Bell,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";

import DoctorLayout from "@/components/layouts/DoctorLayout";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import T from "@/components/T";

interface FollowUp {
  _id: string;
  patient: {
    _id: string;
    name: string;
  };
  followUpDate: string;
  reason: string;
}

const DoctorFollowUps = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [daysFromToday, setDaysFromToday] = useState<number>(7);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDays, setEditDays] = useState<number>(7);
  const [editReason, setEditReason] = useState("");

  const token = localStorage.getItem("token");

  /* =============================
     FETCH DOCTOR PRESCRIPTIONS
  ============================== */
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5001/api/prescriptions/doctor/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setPrescriptions(res.data))
      .catch(() => {});
  }, [token]);

  /* =============================
     FETCH FOLLOW-UPS
  ============================== */
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5001/api/follow-ups/doctor/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setFollowUps(res.data?.data || []))
      .catch(() => {});
  }, [token]);

  /* =============================
     CREATE FOLLOW-UP
  ============================== */
  const handleCreateFollowUp = async () => {
    if (!selectedPatientId) {
      alert("Please select a patient");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5001/api/follow-ups",
        {
          patientId: selectedPatientId,
          daysFromToday,
          reason
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setFollowUps(prev => [...prev, res.data.data]);

      setReason("");
      setSelectedPatientId(null);

    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create follow-up");
    } finally {
      setLoading(false);
    }
  };

  /* =============================
     UPDATE FOLLOW-UP
  ============================== */
  const handleUpdateFollowUp = async (id: string) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/follow-ups/${id}`,
        {
          daysFromToday: editDays,
          reason: editReason
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setFollowUps(prev =>
        prev.map(fu => (fu._id === id ? res.data.data : fu))
      );

      setEditingId(null);
    } catch {
      alert("Failed to update follow-up");
    }
  };

  /* =============================
     DELETE FOLLOW-UP
  ============================== */
  const handleDeleteFollowUp = async (id: string) => {
    if (!confirm("Delete this follow-up?")) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/follow-ups/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setFollowUps(prev => prev.filter(fu => fu._id !== id));
    } catch {
      alert("Failed to delete follow-up");
    }
  };

  return (
    <DoctorLayout>
      <div className="bg-primary/30 m-6 p-6 rounded-3xl">
        <Breadcrumbs />

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            <T>Follow-up Management</T>
          </h1>
          <p className="text-sm text-secondary/60 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <T>Schedule and track patient follow-ups</T>
          </p>
        </div>

        {/* CREATE FOLLOW-UP */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">
          <h2 className="font-semibold">
            <T>Schedule New Follow-up</T>
          </h2>

          <select
            className="w-full border rounded p-2"
            value={selectedPatientId || ""}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            <option value="">Select Patient</option>
            {prescriptions.map(p => (
              <option key={p._id} value={p.patient._id}>
                {p.patient.name}
              </option>
            ))}
          </select>

          <Input
            type="number"
            placeholder="Days from today"
            value={daysFromToday}
            onChange={(e) => setDaysFromToday(Number(e.target.value))}
          />

          <Input
            placeholder="Reason (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <Button
            onClick={handleCreateFollowUp}
            disabled={loading}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Scheduling..." : "Schedule Follow-up"}
          </Button>
        </div>

        {/* FOLLOW-UP LIST */}
        <div className="bg-white rounded-xl shadow divide-y">
          {followUps.length === 0 && (
            <p className="p-4 text-center text-muted-foreground">
              No upcoming follow-ups
            </p>
          )}

          {followUps.map(fu => (
            <div key={fu._id} className="p-4 flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-semibold">{fu.patient.name}</p>

                {editingId === fu._id ? (
                  <>
                    <Input
                      type="number"
                      value={editDays}
                      onChange={(e) => setEditDays(Number(e.target.value))}
                    />
                    <Input
                      value={editReason}
                      onChange={(e) => setEditReason(e.target.value)}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleUpdateFollowUp(fu._id)}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">{fu.reason || "—"}</p>
                    <p className="text-xs flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(fu.followUpDate).toDateString()}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-secondary/60" />
                <Switch checked />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingId(fu._id);
                    setEditReason(fu.reason || "");
                    setEditDays(7);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteFollowUp(fu._id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorFollowUps;
