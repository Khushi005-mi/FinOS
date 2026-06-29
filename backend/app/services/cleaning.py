import pandas as pd

def clean_dates(df, column_name):
    df[column_name] = pd.to_datetime(df[column_name], errors="coerce")
    return df

def remove_duplicates(df, subset_column):
    df = df.drop_duplicates(subset=[subset_column], keep="first")
    return df

def handle_missing_critical(df, column_name):
    df = df.dropna(subset=[column_name])
    return df

def handle_missing_optional(df, column_name, default_value):
    df[column_name] = df[column_name].fillna(default_value)
    return df

def validate_amount(df, column_name):
    df = df[df[column_name] >= 0]
    return df
    