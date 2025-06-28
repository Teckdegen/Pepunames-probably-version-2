export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      domains: {
        Row: {
          confirmation_time: string | null
          created_at: string
          domain_name: string
          expires_at: string
          id: string
          notification_sent: boolean
          payment_amount: string
          payment_confirmed: boolean
          reserved_at: string
          tx_hash: string
          updated_at: string
          wallet_address: string
        }
        Insert: {
          confirmation_time?: string | null
          created_at?: string
          domain_name: string
          expires_at: string
          id?: string
          notification_sent?: boolean
          payment_amount: string
          payment_confirmed?: boolean
          reserved_at?: string
          tx_hash: string
          updated_at?: string
          wallet_address: string
        }
        Update: {
          confirmation_time?: string | null
          created_at?: string
          domain_name?: string
          expires_at?: string
          id?: string
          notification_sent?: boolean
          payment_amount?: string
          payment_confirmed?: boolean
          reserved_at?: string
          tx_hash?: string
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          attempt_count: number
          created_at: string
          domain_id: string | null
          error_message: string | null
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          domain_id?: string | null
          error_message?: string | null
          id?: string
          status: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          created_at?: string
          domain_id?: string | null
          error_message?: string | null
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "active_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains_needing_notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "expired_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_domains: {
        Row: {
          created_at: string
          domain_name: string
          expires_at: string
          id: string
          initiated_at: string
          tx_hash: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string
          domain_name: string
          expires_at: string
          id?: string
          initiated_at?: string
          tx_hash?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string
          domain_name?: string
          expires_at?: string
          id?: string
          initiated_at?: string
          tx_hash?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      transaction_logs: {
        Row: {
          amount: string
          created_at: string
          domain_name: string
          id: string
          message: string | null
          status: string
          tx_hash: string | null
          updated_at: string
          wallet_address: string
        }
        Insert: {
          amount: string
          created_at?: string
          domain_name: string
          id?: string
          message?: string | null
          status: string
          tx_hash?: string | null
          updated_at?: string
          wallet_address: string
        }
        Update: {
          amount?: string
          created_at?: string
          domain_name?: string
          id?: string
          message?: string | null
          status?: string
          tx_hash?: string | null
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_domains: {
        Row: {
          confirmation_time: string | null
          created_at: string | null
          domain_name: string | null
          expires_at: string | null
          id: string | null
          notification_sent: boolean | null
          payment_amount: string | null
          payment_confirmed: boolean | null
          reserved_at: string | null
          tx_hash: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          confirmation_time?: string | null
          created_at?: string | null
          domain_name?: string | null
          expires_at?: string | null
          id?: string | null
          notification_sent?: boolean | null
          payment_amount?: string | null
          payment_confirmed?: boolean | null
          reserved_at?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          confirmation_time?: string | null
          created_at?: string | null
          domain_name?: string | null
          expires_at?: string | null
          id?: string | null
          notification_sent?: boolean | null
          payment_amount?: string | null
          payment_confirmed?: boolean | null
          reserved_at?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      domains_needing_notification: {
        Row: {
          confirmation_time: string | null
          created_at: string | null
          domain_name: string | null
          expires_at: string | null
          id: string | null
          notification_sent: boolean | null
          payment_amount: string | null
          payment_confirmed: boolean | null
          reserved_at: string | null
          tx_hash: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Relationships: []
      }
      expired_domains: {
        Row: {
          confirmation_time: string | null
          created_at: string | null
          domain_name: string | null
          expires_at: string | null
          id: string | null
          notification_sent: boolean | null
          payment_amount: string | null
          payment_confirmed: boolean | null
          reserved_at: string | null
          tx_hash: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          confirmation_time?: string | null
          created_at?: string | null
          domain_name?: string | null
          expires_at?: string | null
          id?: string | null
          notification_sent?: boolean | null
          payment_amount?: string | null
          payment_confirmed?: boolean | null
          reserved_at?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          confirmation_time?: string | null
          created_at?: string | null
          domain_name?: string | null
          expires_at?: string | null
          id?: string | null
          notification_sent?: boolean | null
          payment_amount?: string | null
          payment_confirmed?: boolean | null
          reserved_at?: string | null
          tx_hash?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      pending_transactions: {
        Row: {
          amount: string | null
          expires_at: string | null
          initiated_at: string | null
          message: string | null
          pending_created_at: string | null
          pending_domain_id: string | null
          status: string | null
          transaction_created_at: string | null
          transaction_domain_name: string | null
          transaction_id: string | null
          transaction_updated_at: string | null
          tx_hash: string | null
          wallet_address: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_domain_availability: {
        Args: { name: string }
        Returns: boolean
      }
      confirm_domain_registration: {
        Args: {
          name: string
          wallet: string
          tx: string
          payment_amount: string
        }
        Returns: string
      }
      log_notification_status: {
        Args: {
          domain_uuid: string
          notification_status: string
          error_msg?: string
        }
        Returns: string
      }
      reserve_domain_temporarily: {
        Args: { name: string; wallet: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
