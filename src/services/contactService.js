import { supabase } from '../supabase/client'

export const enviarMensaje = async (formData) => {
  const { data, error } = await supabase
    .from('contactos')
    .insert([formData])

  if (error) throw error
  return data
}