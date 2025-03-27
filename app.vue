<template>
    <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800">
      <header class="bg-white dark:bg-emerald-950 shadow-md">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-emerald-700 dark:text-emerald-300">Backyard Ultra Fundraiser</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-2">Supporting <a href="https://www.bris.se/" class="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank">Bris</a> - Children's Rights in Society</p>
        </div>
      </header>
  
      <main class="container mx-auto px-4 py-8">
        <!-- Current Stats Section -->
        <div class="bg-white dark:bg-emerald-950 rounded-lg shadow-lg p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
              <h2 class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{{ laps }}</h2>
              <p class="text-gray-600 dark:text-gray-400">Laps Completed</p>
            </div>
            <div class="p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
              <h2 class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{{ totalPledgers }}</h2>
              <p class="text-gray-600 dark:text-gray-400">Supporters</p>
            </div>
            <div class="p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
              <h2 class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{{ formatCurrency(totalRaised) }}</h2>
              <p class="text-gray-600 dark:text-gray-400">Total Raised</p>
            </div>
          </div>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Pledge Form -->
          <div class="bg-white dark:bg-emerald-950 rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4">Make a Pledge</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Pledge an amount per lap completed. You'll only donate based on the final number of laps!
            </p>
            
            <form @submit.prevent="submitPledge" class="space-y-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2" for="name">Your Name (Optional)</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="pledgeForm.name" 
                  placeholder="Enter your name or leave blank to be anonymous"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-emerald-900 dark:border-emerald-700 dark:text-white"
                >
              </div>
              
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2" for="amount">Amount per Lap (SEK)</label>
                <input 
                  type="number" 
                  id="amount" 
                  v-model="pledgeForm.amountPerLap" 
                  min="1" 
                  step="1"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-emerald-900 dark:border-emerald-700 dark:text-white"
                >
              </div>
              
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2" for="message">Message (Optional)</label>
                <textarea 
                  id="message" 
                  v-model="pledgeForm.message" 
                  rows="3" 
                  placeholder="Add a message of encouragement"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-emerald-900 dark:border-emerald-700 dark:text-white"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                Submit Pledge
              </button>
            </form>
          </div>
  
          <!-- Pledgers List -->
          <div class="bg-white dark:bg-emerald-950 rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4">Supporters</h2>
            
            <div class="overflow-y-auto max-h-96">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b dark:border-emerald-700">
                    <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Name</th>
                    <th class="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Amount/Lap</th>
                    <th class="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pledger, index) in pledgers" :key="index" class="border-b dark:border-emerald-700">
                    <td class="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {{ pledger.name || 'Anonymous' }}
                      <p v-if="pledger.message" class="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                        "{{ pledger.message }}"
                      </p>
                    </td>
                    <td class="py-3 px-4 text-right text-gray-800 dark:text-gray-200">
                      {{ formatCurrency(pledger.amountPerLap) }}
                    </td>
                    <td class="py-3 px-4 text-right text-gray-800 dark:text-gray-200">
                      {{ formatCurrency(pledger.amountPerLap * laps) }}
                    </td>
                  </tr>
                  <tr v-if="pledgers.length === 0">
                    <td colspan="3" class="py-4 text-center text-gray-500 dark:text-gray-400">
                      No pledges yet. Be the first to support!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <!-- Admin Section (Hidden by default) -->
        <div v-if="showAdmin" class="mt-8 bg-white dark:bg-emerald-950 rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4">Admin Controls</h2>
          
          <div class="flex items-center space-x-4">
            <button 
              @click="decrementLaps" 
              class="bg-gray-200 hover:bg-gray-300 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-lg"
              :disabled="laps <= 0"
            >
              -
            </button>
            
            <div class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {{ laps }} Laps
            </div>
            
            <button 
              @click="incrementLaps" 
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      </main>
  
      <footer class="bg-white dark:bg-emerald-950 shadow-inner mt-8 py-6">
        <div class="container mx-auto px-4 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Running for a cause - Supporting <a href="https://www.bris.se/" class="text-emerald-600 dark:text-emerald-400 hover:underline" target="_blank">Bris</a>
          </p>
          <button 
            @click="toggleAdmin" 
            class="mt-4 text-sm text-gray-500 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Admin
          </button>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // State
  const laps = ref(0);
  const pledgers = ref([]);
  const showAdmin = ref(false);
  const pledgeForm = ref({
    name: '',
    amountPerLap: 50,
    message: ''
  });
  
  // Computed properties
  const totalPledgers = computed(() => pledgers.value.length);
  const totalRaised = computed(() => {
    return pledgers.value.reduce((total, pledger) => {
      return total + (pledger.amountPerLap * laps.value);
    }, 0);
  });
  
  // Methods
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('sv-SE', { 
      style: 'currency', 
      currency: 'SEK',
      maximumFractionDigits: 0 
    }).format(amount);
  };
  
  const submitPledge = async () => {
    if (pledgeForm.value.amountPerLap <= 0) {
      alert('Please enter a valid amount per lap');
      return;
    }

    const { data, error } = await supabase
      .from('pledgers')
      .insert([
        {
          name: pledgeForm.value.name,
          amountPerLap: Number(pledgeForm.value.amountPerLap),
          message: pledgeForm.value.message
        }
      ]).select();

    if (error) {
      alert('Error saving pledge: ' + error.message);
      return;
    }

    // Update local state
    pledgers.value.push(data[0]);

    // Reset form
    pledgeForm.value = {
      name: '',
      amountPerLap: 50,
      message: ''
    };
  };
  
  const updateLapsInSupabase = async (newLaps) => {
    const { error } = await supabase
      .from('laps')
      .update({ laps: newLaps })
      .eq('id', 1); // assuming row with id=1
    if (error) {
      alert('Error updating laps: ' + error.message);
    }
  };

  const incrementLaps = async () => {
    laps.value++;
    await updateLapsInSupabase(laps.value);
  };

  const decrementLaps = async () => {
    if (laps.value > 0) {
      laps.value--;
      await updateLapsInSupabase(laps.value);
    }
  };

  const toggleAdmin = () => {
  // In a real app, you would have proper authentication
  // This is just a simple toggle for demonstration
  if (!showAdmin.value) {
    const password = prompt('Enter admin password:');
    if (password === 'ultrarun') { // Simple password for demo
      showAdmin.value = true;
    }
  } else {
    showAdmin.value = false;
  }
};
  
  // Load data from Supabase on mount
  onMounted(async () => {
    const { data: lapsData, error: lapsError } = await supabase
      .from('laps')
      .select('laps')
      .eq('id', 1)
      .single();
    if (!lapsError && lapsData) {
      laps.value = lapsData.laps;
    }

    const { data: pledgersData, error: pledgersError } = await supabase
      .from('pledgers')
      .select('*');
    if (!pledgersError && pledgersData) {
      pledgers.value = pledgersData;
    }
  });
  </script>