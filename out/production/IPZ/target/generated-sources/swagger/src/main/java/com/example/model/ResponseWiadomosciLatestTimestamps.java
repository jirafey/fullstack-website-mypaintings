package com.example.model;

import java.util.Objects;
import com.example.model.ResponseWiadomosciLatestTimestampsTimestamps;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseWiadomosciLatestTimestamps
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseWiadomosciLatestTimestamps   {
  @JsonProperty("timestamps")
  @Valid
  private List<ResponseWiadomosciLatestTimestampsTimestamps> timestamps = null;

  public ResponseWiadomosciLatestTimestamps timestamps(List<ResponseWiadomosciLatestTimestampsTimestamps> timestamps) {
    this.timestamps = timestamps;
    return this;
  }

  public ResponseWiadomosciLatestTimestamps addTimestampsItem(ResponseWiadomosciLatestTimestampsTimestamps timestampsItem) {
    if (this.timestamps == null) {
      this.timestamps = new ArrayList<>();
    }
    this.timestamps.add(timestampsItem);
    return this;
  }

  /**
   * Get timestamps
   * @return timestamps
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseWiadomosciLatestTimestampsTimestamps> getTimestamps() {
    return timestamps;
  }

  public void setTimestamps(List<ResponseWiadomosciLatestTimestampsTimestamps> timestamps) {
    this.timestamps = timestamps;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseWiadomosciLatestTimestamps responseWiadomosciLatestTimestamps = (ResponseWiadomosciLatestTimestamps) o;
    return Objects.equals(this.timestamps, responseWiadomosciLatestTimestamps.timestamps);
  }

  @Override
  public int hashCode() {
    return Objects.hash(timestamps);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseWiadomosciLatestTimestamps {\n");
    
    sb.append("    timestamps: ").append(toIndentedString(timestamps)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
